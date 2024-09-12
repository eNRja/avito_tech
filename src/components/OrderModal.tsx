import { Box, Button, Modal, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { FC } from "react";
import "../styles/components/OrderModal.sass";
import EmptyLogo from "../image/no-image-svgrepo-com.svg";
import { OrderItem } from "../utils/types";

interface OrderItemsModalProps {
  open: boolean;
  handleClose: () => void;
  items: OrderItem[] | null;
  id: string;
}

export const OrderModal: FC<OrderItemsModalProps> = ({
  open,
  handleClose,
  items,
  id,
}) => {
  console.log(items);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="order_modal">
        <Typography variant="h5" className="order_modal__title">
          Товары в заказе №{id}
        </Typography>
        {items &&
          items.map((item: OrderItem) => (
            <Card
              key={item.id}
              component={Link}
              to={`/advertisements/${item.id}`}
              className="order_modal__card"
            >
              <Box className="order_modal__item-details">
                <Box className="order_modal__item-info">
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Количество: {item.count}</Typography>
                  <Typography>Цена: {item.price} руб.</Typography>
                </Box>
                <Box
                  component="img"
                  src={!item.imageUrl ? EmptyLogo : item.imageUrl}
                  alt={item.name}
                  className="order_modal__image"
                />
              </Box>
            </Card>
          ))}
        <Button
          onClick={handleClose}
          variant="contained"
          className="order_modal__button"
        >
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
};
