import useLocale from "@dashboard/hooks/useLocale";
import { useExtraCells } from "@glideapps/glide-data-grid-cells";
import { useTheme } from "@saleor/macaw-ui/next";
import { useMemo } from "react";

import { dropdownCellRenderer } from "./DropdownCell";
import { moneyCellRenderer } from "./Money/MoneyCell";
import { moneyDiscountedCellRenderer } from "./Money/MoneyDiscountedCell";
import { numberCellRenderer } from "./NumberCell";
import { statusCellRenderer } from "./StatusCell";
import { thumbnailCellRenderer } from "./ThumbnailCell";

export function useCustomCellRenderers() {
  const { locale } = useLocale();
  const { customRenderers } = useExtraCells();
  const { themeValues } = useTheme();

  const renderers = useMemo(
    () => [
      moneyCellRenderer(),
      moneyDiscountedCellRenderer(),
      numberCellRenderer(locale),
      statusCellRenderer(themeValues),
      dropdownCellRenderer,
      thumbnailCellRenderer,
      ...customRenderers,
    ],
    [customRenderers, locale],
  );

  return renderers;
}
