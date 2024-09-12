import reducer, {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
} from "./orderReducer";
import { Order, OrderStatus } from "../../utils/types";

describe("orderSlice", () => {
  const initialState = {
    orders: null,
    loading: false,
    error: null,
  };

  it("should handle fetchOrderStart", () => {
    const action = fetchOrderStart();
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: null,
      loading: true,
      error: null,
    });
  });

  it("should handle fetchOrderSuccess", () => {
    const orders: Order[] = [
      {
        id: "1",
        status: OrderStatus.Created,
        createdAt: "2024-09-12T00:00:00Z",
        items: [
          {
            id: "1",
            name: "Item 1",
            price: 100,
            createdAt: "2024-09-12T00:00:00Z",
            views: 0, // Добавлено поле views
            likes: 0, // Добавлено поле likes
            count: 1,
          },
        ],
        deliveryWay: "Courier",
        total: 100,
      },
      {
        id: "2",
        status: OrderStatus.Paid,
        createdAt: "2024-09-12T00:00:00Z",
        items: [
          {
            id: "2",
            name: "Item 2",
            price: 200,
            createdAt: "2024-09-12T00:00:00Z",
            views: 0, // Добавлено поле views
            likes: 0, // Добавлено поле likes
            count: 2,
          },
        ],
        deliveryWay: "Postal",
        total: 400,
      },
    ];
    const action = fetchOrderSuccess(orders);
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders,
      loading: false,
      error: null,
    });
  });

  it("should handle fetchOrderFailure", () => {
    const errorMessage = "Failed to fetch orders";
    const action = fetchOrderFailure(errorMessage);
    const state = reducer(initialState, action);
    expect(state).toEqual({
      orders: null,
      loading: false,
      error: errorMessage,
    });
  });
});
