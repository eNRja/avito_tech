import * as yup from "yup";

export const validationSchema = yup.object({
  // TODO: раскомментировать URL, закомментировал для проверки работоспособности,
  // так же в типах NewAdvertisement, сделать поле imageURL обязательным
  //   imageUrl: yup
  //     .string()
  //     .url("Введите корректный URL")
  //     .required("URL обязателен"),
  name: yup.string().required("Название обязательно"),
  description: yup.string().required("Описание обязательно"),
  price: yup
    .number()
    .positive("Стоимость должна быть положительным числом")
    .required("Стоимость обязательна"),
});
