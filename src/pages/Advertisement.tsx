import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useDispatch, useSelector } from "../services/store";
import { Advertisement, NewAdvertisement } from "../utils/types";
import {
  fetchAdvertismentId,
  fetchUpdateAdvertisement,
} from "../api/advertisementApi";
import { validationSchema } from "../utils/validation";
import EmptyLogo from "../image/no-image-svgrepo-com.svg";
import "../styles/pages/Advertisement.sass";

export const Advertisment: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { advertisement, loading, error } = useSelector(
    (state: RootState) => state.advertisment
  );

  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewAdvertisement>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchAdvertismentId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (advertisement) {
      reset({
        name: advertisement.name || "",
        imageUrl: advertisement.imageUrl || "",
        description: advertisement.description || "",
        price: advertisement.price || 0,
      });
    }
  }, [advertisement, reset]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (data: NewAdvertisement) => {
    if (advertisement) {
      const updatedAdvertisement: Advertisement = {
        ...advertisement,
        ...data,
      };
      dispatch(fetchUpdateAdvertisement(updatedAdvertisement));
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    if (advertisement) {
      reset(advertisement);
    }
    setIsEditing(false);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container className="advertisement__container">
      {advertisement ? (
        <Card className="advertisement__card">
          <Box className="advertisement__edit_button">
            {!isEditing && (
              <IconButton
                onClick={handleEditClick}
                sx={{ color: "primary.main" }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Box className="advertisement__title">
            <Typography variant="h4">{advertisement.name}</Typography>
          </Box>
          {isEditing ? (
            <Box
              className="advertisement__form"
              component="form"
              onSubmit={handleSubmit(handleSaveClick)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Название"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className="advertisement__field"
                  />
                )}
              />
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Картинка (URL)"
                    fullWidth
                    margin="normal"
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                    className="advertisement__field"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Описание"
                    fullWidth
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className="advertisement__field"
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Стоимость"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    className="advertisement__field"
                  />
                )}
              />
              <Box className="advertisement__buttons">
                <Button
                  onClick={handleCancelClick}
                  variant="outlined"
                  sx={{ marginRight: 1 }}
                >
                  Отмена
                </Button>
                <Button type="submit" variant="contained">
                  Применить
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <CardMedia
                component="img"
                image={
                  !advertisement.imageUrl ? EmptyLogo : advertisement.imageUrl
                }
                alt={advertisement.name}
                sx={{
                  width: "100%",
                  height: "300px",
                  mb: "16px",
                  objectFit: "contain",
                }}
              />
              <CardContent className="advertisement__content">
                <Typography variant="body1">
                  {advertisement.description}
                </Typography>
                <Typography variant="h6" className="advertisement__price">
                  Цена: {advertisement.price} ₽
                </Typography>
                <Box className="advertisement__stats">
                  <Typography variant="body2">
                    Просмотров: {advertisement.views}
                  </Typography>
                  <Typography variant="body2">
                    Лайков: {advertisement.likes}
                  </Typography>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      ) : (
        <Typography>Объявление не найдено</Typography>
      )}
      <Button onClick={handleBackClick} variant="outlined" sx={{ mb: 4 }}>
        Назад
      </Button>
    </Container>
  );
};
