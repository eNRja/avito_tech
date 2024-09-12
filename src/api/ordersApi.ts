import {
  fetchOrderFailure,
  fetchOrderStart,
  fetchOrderSuccess,
} from "../services/reducers/orderReducer";
import { AppDispatch } from "../services/store";
import { ORDER_URL } from "../utils/constants";
import { Order } from "../utils/types";

// Получить все объявления
export const fetchAllOrders = () => async (dispatch: AppDispatch) => {
  dispatch(fetchOrderStart());

  try {
    const response = await fetch(ORDER_URL);

    if (!response.ok) {
      throw new Error("Ошибка при загрузке объявлений");
    }

    const data = await response.json();

    dispatch(fetchOrderSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchOrderFailure(error.message));
    } else {
      dispatch(fetchOrderFailure("Неизвестная ошибка"));
    }
  }
};

// Изменить статус заказа по ID
export const fetchUpdateOrder =
  (order: Order) => async (dispatch: AppDispatch) => {
    dispatch(fetchOrderStart());

    try {
      const response = await fetch(`${ORDER_URL}/${order.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении объявления");
      }

      dispatch(fetchAllOrders());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchOrderFailure(error.message));
      } else {
        dispatch(fetchOrderFailure("Неизвестная ошибка"));
      }
    }
  };
