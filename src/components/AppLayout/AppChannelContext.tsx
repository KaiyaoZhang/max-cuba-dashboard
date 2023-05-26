import { useUser } from "@dashboard/auth";
import { ChannelFragment, useBaseChannelsQuery } from "@dashboard/graphql";
import useLocalStorage from "@dashboard/hooks/useLocalStorage";
import { getById } from "@dashboard/misc";
import { getUserAccessibleChannels } from "@dashboard/permissionGroups/utils";
import { useSaleorConfig } from "@saleor/sdk";
import React from "react";

interface UseAppChannel {
  availableChannels: ChannelFragment[];
  channel: ChannelFragment;
  isPickerActive: boolean;
  refreshChannels: () => void;
  setChannel: (id: string) => void;
}
export interface AppChannelContextData extends UseAppChannel {
  setPickerActive: (isActive: boolean) => void;
}

const AppChannelContext = React.createContext<AppChannelContextData>({
  availableChannels: [],
  channel: undefined,
  isPickerActive: false,
  refreshChannels: () => undefined,
  setChannel: () => undefined,
  setPickerActive: () => undefined,
});

const isValidChannel = (channelId: string, channelList?: ChannelFragment[]) => {
  if (!channelId) {
    return false;
  }

  return channelList?.some(getById(channelId));
};

export const AppChannelProvider: React.FC = ({ children }) => {
  const { setChannel } = useSaleorConfig();
  const { authenticated, user } = useUser();
  const [selectedChannel, setSelectedChannel] = useLocalStorage("channel", "");
  const { data: channelData, refetch } = useBaseChannelsQuery({
    skip: !authenticated || !user,
  });

  const [isPickerActive, setPickerActive] = React.useState(false);
  React.useEffect(() => {
    const userChannels = getUserAccessibleChannels(user);
    const channels =
      "accessibleChannels" in user ? userChannels : channelData?.channels;

    if (!isValidChannel(selectedChannel, channels) && channels?.length > 0) {
      setSelectedChannel(channelData.channels[0].id);
    }
  }, [channelData, selectedChannel, setSelectedChannel, user]);

  React.useEffect(() => {
    setChannel(selectedChannel);
  }, [selectedChannel, setChannel]);

  const availableChannels = channelData?.channels || [];

  const channel =
    channelData && (availableChannels.find(getById(selectedChannel)) || null);

  return (
    <AppChannelContext.Provider
      value={{
        availableChannels,
        channel,
        isPickerActive,
        refreshChannels: refetch,
        setChannel: setSelectedChannel,
        setPickerActive,
      }}
    >
      {children}
    </AppChannelContext.Provider>
  );
};

AppChannelProvider.displayName = "AppChannelProvider";

function useAppChannel(enablePicker = true): UseAppChannel {
  const { setPickerActive, ...data } = React.useContext(AppChannelContext);
  React.useEffect(() => {
    if (enablePicker) {
      setPickerActive(true);
    }

    return () => setPickerActive(false);
  }, [enablePicker]);

  return data;
}

export default useAppChannel;
