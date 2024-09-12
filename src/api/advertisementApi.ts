import {
  fetchAdvertisementFailure,
  fetchAdvertisementIdSuccess,
  fetchAdvertisementStart,
  fetchAdvertisementSuccess,
  fetchAllAdvertisementSuccess,
} from "../services/reducers/advertisementReducer";
import { AppDispatch } from "../services/store";
import {
  ADV_URL,
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE,
} from "../utils/constants";
import { Advertisement, NewAdvertisement } from "../utils/types";

// Получить все объявления
export const fetchAllAdvertisements = () => async (dispatch: AppDispatch) => {
  dispatch(fetchAdvertisementStart());

  try {
    const response = await fetch(ADV_URL);

    if (!response.ok) {
      throw new Error("Ошибка при загрузке объявлений");
    }

    const data = await response.json();

    dispatch(fetchAllAdvertisementSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchAdvertisementFailure(error.message));
    } else {
      dispatch(fetchAdvertisementFailure("Неизвестная ошибка"));
    }
  }
};

// Получить объявления со страницами
export const fetchAdvertisements =
  ({ page, perPage }: { page?: number; perPage?: number }) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchAdvertisementStart());

    try {
      const response = await fetch(
        `${ADV_URL}?_page=${page ? page : DEFAULT_PAGE}&_per_page=${
          perPage ? perPage : DEFAULT_ITEMS_PER_PAGE
        }`
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке объявлений");
      }

      const data = await response.json();

      dispatch(fetchAdvertisementSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchAdvertisementFailure(error.message));
      } else {
        dispatch(fetchAdvertisementFailure("Неизвестная ошибка"));
      }
    }
  };

// Получить объявление по ID
export const fetchAdvertismentId =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchAdvertisementStart());

    try {
      const response = await fetch(`${ADV_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке объявлений");
      }

      const data = await response.json();
      dispatch(fetchAdvertisementIdSuccess(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchAdvertisementFailure(error.message));
      } else {
        dispatch(fetchAdvertisementFailure("Неизвестная ошибка"));
      }
    }
  };

// Добавить объявление
export const fetchAdvertismentAdd =
  (newAdvertisement: NewAdvertisement, page: number, perPage: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchAdvertisementStart());
    console.log(newAdvertisement);
    try {
      const response = await fetch(`${ADV_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdvertisement),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении объявления");
      }

      dispatch(fetchAdvertisements({ page, perPage }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchAdvertisementFailure(error.message));
      } else {
        dispatch(fetchAdvertisementFailure("Неизвестная ошибка"));
      }
    }
  };

// Обновить объявление
export const fetchUpdateAdvertisement =
  (editedAd: Advertisement) => async (dispatch: AppDispatch) => {
    dispatch(fetchAdvertisementStart());

    try {
      const response = await fetch(`${ADV_URL}/${editedAd.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedAd),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении объявления");
      }
      const data = await response.json();

      dispatch(fetchAdvertisementSuccess(data));
      dispatch(fetchAdvertismentId(data.id));
      dispatch(fetchAdvertisements({}));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchAdvertisementFailure(error.message));
      } else {
        dispatch(fetchAdvertisementFailure("Неизвестная ошибка"));
      }
    }
  };
