import {
  ListItem,
  ListItemText,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Order, OrderStatus } from "../utils/types";
import "../styles/components/OrderItem.sass";
import { FC } from "react";

interface OrderItemProps {
  order: Order;
  onOrderClick: (order: Order) => void;
  onCompleteOrder: (order: Order) => void;
}

export const OrderItem: FC<OrderItemProps> = ({
  order,
  onOrderClick,
  onCompleteOrder,
}) => {
  return (
    <ListItem component={Paper} elevation={2} className="order_item">
      <ListItemText
        primary={`Заказ №${order.id}`}
        secondary={
          <>
            <Typography component="span" className="order_item__info">
              Количество товаров: {order.items.length}
            </Typography>
            <Typography component="span" className="order_item__info">
              Стоимость: {order.total} руб.
            </Typography>
            <Typography component="span" className="order_item__info">
              Дата создания: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Typography component="span" className="order_item__info">
              Статус: {Object.keys(OrderStatus)[order.status]}
            </Typography>
          </>
        }
      />
      <Button
        onClick={() => onOrderClick(order)}
        className="order_item__button"
      >
        Показать все товары
      </Button>
      {order.status === 5 ? (
        <Button disabled className="order_item__button">
          Заказ завершен
        </Button>
      ) : (
        <Button
          onClick={() => onCompleteOrder(order)}
          className="order_item__button"
        >
          Завершить заказ
        </Button>
      )}
    </ListItem>
  );
};
