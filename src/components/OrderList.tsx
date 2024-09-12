import { List } from "@mui/material";
import { OrderItem } from "./OrderItem";
import { Order } from "../utils/types";
import { FC } from "react";

interface OrderListProps {
  orders: Order[];
  onOrderClick: (order: Order) => void;
  onCompleteOrder: (order: Order) => void;
}

export const OrderList: FC<OrderListProps> = ({
  orders,
  onOrderClick,
  onCompleteOrder,
}) => {
  return (
    <List>
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onOrderClick={onOrderClick}
          onCompleteOrder={onCompleteOrder}
        />
      ))}
    </List>
  );
};
