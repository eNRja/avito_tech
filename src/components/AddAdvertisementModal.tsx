import { FC } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../utils/validation";
import { NewAdvertisement } from "../utils/types";
import "../styles/components/AddAdvertisementModal.sass";

interface AddAdvertisementModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: NewAdvertisement) => void;
}

export const AddAdvertisementModal: FC<AddAdvertisementModalProps> = ({
  open,
  handleClose,
  handleSubmit,
}) => {
  const {
    control,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<NewAdvertisement>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: NewAdvertisement) => {
    const newAd = {
      ...data,
      createdAt: new Date().toISOString(),
      likes: 0,
      views: 0,
    };
    handleSubmit(newAd);
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="add_advertisement_modal">
        <Controller
          name="imageUrl"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Картинка (URL)"
              fullWidth
              margin="normal"
              error={!!errors.imageUrl}
              helperText={errors.imageUrl?.message}
              className="add_advertisement_modal__field"
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Название"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              className="add_advertisement_modal__field"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Описание"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
              className="add_advertisement_modal__field"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="Стоимость"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              className="add_advertisement_modal__field"
            />
          )}
        />
        <Button
          onClick={handleFormSubmit(onSubmit)}
          variant="contained"
          className="add_advertisement_modal__submit_button"
        >
          Добавить
        </Button>
      </Box>
    </Modal>
  );
};
