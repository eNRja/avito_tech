import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Advertisement } from "../utils/types";
import EmptyLogo from "../image/no-image-svgrepo-com.svg";
import "../styles/components/AdvertisementItem.sass";

interface ItemProps {
  item: Advertisement;
}

export const AdvertismentItem = ({ item }: ItemProps) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/orders?item=${item.id}`);
  };

  return (
    <Box className="advertisment_item_container">
      <Card
        component={Link}
        to={`/advertisements/${item.id}`}
        className="advertisment_item"
      >
        <CardMedia
          component="img"
          image={!item.imageUrl ? EmptyLogo : item.imageUrl}
          alt={item.name}
          sx={{
            flex: "1 1 30%",
            objectFit: "contain",
            width: "auto",
            height: 120,
          }}
        />
        <CardContent className="advertisment_item__content">
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {`${item.price} ₽`}
          </Typography>
          <Box className="advertisment_item__info">
            <Typography variant="body2" sx={{ mr: 4 }}>
              Просмотров: {item.views}
            </Typography>
            <Typography variant="body2">Лайков: {item.likes}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="inherit"
        size="small"
        className="advertisment_item__button"
        onClick={handleOrder}
        sx={{ ml: -8 }}
      >
        Заказать
      </Button>
    </Box>
  );
};
