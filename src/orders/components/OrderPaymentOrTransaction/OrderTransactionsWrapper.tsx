import CardSpacer from "@dashboard/components/CardSpacer";
import { TransactionActionEnum } from "@dashboard/graphql/types.generated";
import {
  OrderDetailsWithTransactionsFragment,
  OrderDetailsWithTransactionsQuery,
} from "@dashboard/graphql/types.transactions.generated";
import React from "react";

import OrderAddTransaction from "../OrderAddTransaction";
import { useStyles } from "../OrderDetailsPage/styles";
import OrderGrantedRefunds from "../OrderGrantedRefunds";
import OrderPaymentSummaryCard from "../OrderPaymentSummaryCard";
import OrderSummaryCard from "../OrderSummaryCard";
import OrderTransaction from "../OrderTransaction";
import OrderTransactionGiftCard from "../OrderTransactionGiftCard";
import OrderTransactionPayment from "../OrderTransactionPayment";

interface OrderTransactionsWrapper {
  order: OrderDetailsWithTransactionsFragment;
  shop: OrderDetailsWithTransactionsQuery["shop"];
  onTransactionAction(transactionId: string, actionType: TransactionActionEnum);
  onPaymentCapture();
  onPaymentPaid();
  onPaymentVoid();
  onAddManualTransaction();
}

export const OrderTransactionsWrapper: React.FC<OrderTransactionsWrapper> = ({
  order,
  shop,
  onTransactionAction,
  onPaymentCapture,
  onPaymentPaid,
  onPaymentVoid,
  onAddManualTransaction,
}) => {
  const classes = useStyles();

  const filteredPayments = React.useMemo(
    () =>
      (order?.payments ?? []).filter(
        payment => payment.isActive || payment.transactions.length > 0,
      ),
    [order?.payments],
  );
  return (
    <>
      <div className={classes.cardGrid}>
        <OrderSummaryCard order={order} />
        <OrderPaymentSummaryCard order={order} onMarkAsPaid={onPaymentPaid} />
      </div>
      <CardSpacer />
      {order?.grantedRefunds?.length !== 0 ? (
        <>
          <OrderGrantedRefunds order={order} />
          <CardSpacer />
        </>
      ) : null}
      <div>
        {order?.transactions?.map(transaction => (
          <OrderTransaction
            key={transaction.id}
            transaction={transaction}
            onTransactionAction={onTransactionAction}
          />
        ))}
        {filteredPayments.map(payment => (
          <OrderTransactionPayment
            key={payment.id}
            payment={payment}
            allPaymentMethods={shop?.availablePaymentGateways}
            onCapture={onPaymentCapture}
            onVoid={onPaymentVoid}
          />
        ))}
        {order?.giftCards?.map(giftCard => (
          <OrderTransactionGiftCard
            key={giftCard.id}
            order={order}
            giftCard={giftCard}
          />
        ))}
      </div>
      <OrderAddTransaction
        order={order}
        onAddTransaction={onAddManualTransaction}
      />
    </>
  );
};
