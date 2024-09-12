import advertisementReducer, {
  fetchAdvertisementStart,
  fetchAllAdvertisementSuccess,
  fetchAdvertisementSuccess,
  fetchAdvertisementIdSuccess,
  fetchAdvertisementFailure,
  changePerPage,
  changeCurrentPage,
} from "./advertisementReducer";
import { Advertisement, AdvertisementsRest } from "../../utils/types";
import { DEFAULT_PAGE, ITEMS_PER_PAGE_DEFAULT } from "../../utils/constants";

describe("advertisementReducer", () => {
  const initialState = {
    advertisements: null,
    rest: null,
    advertisement: null,
    itemsPerPage: ITEMS_PER_PAGE_DEFAULT,
    currentPage: DEFAULT_PAGE,
    loading: false,
    error: null,
  };

  it("should handle fetchAdvertisementStart", () => {
    const nextState = advertisementReducer(
      initialState,
      fetchAdvertisementStart()
    );

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it("should handle fetchAllAdvertisementSuccess", () => {
    const mockAdvertisements: Advertisement[] = [
      {
        id: "1",
        name: "Ad 1",
        description: "Description 1",
        price: 100,
        createdAt: "2024-08-12T12:16:55.351Z",
        views: 0,
        likes: 0,
      },
      {
        id: "2",
        name: "Ad 2",
        description: "Description 2",
        price: 200,
        createdAt: "2024-08-12T12:16:55.351Z",
        views: 0,
        likes: 0,
      },
    ];

    const nextState = advertisementReducer(
      initialState,
      fetchAllAdvertisementSuccess(mockAdvertisements)
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
    expect(nextState.advertisements).toEqual(mockAdvertisements);
  });

  it("should handle fetchAdvertisementSuccess", () => {
    const mockData: AdvertisementsRest = {
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 1,
      data: [
        {
          id: "1",
          name: "Ad 1",
          price: 100,
          createdAt: "2024-08-12T12:16:55.351Z",
          likes: 0,
          views: 0,
        },
      ],
    };

    const nextState = advertisementReducer(
      initialState,
      fetchAdvertisementSuccess(mockData)
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
    expect(nextState.advertisements).toEqual(mockData.data);
    expect(nextState.rest).toEqual({
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 1,
    });
  });

  it("should handle fetchAdvertisementIdSuccess", () => {
    const mockAdvertisement: Advertisement = {
      id: "1",
      name: "Ad 1",
      price: 100,
      createdAt: "2024-08-12T12:16:55.351Z",
      likes: 0,
      views: 0,
    };

    const nextState = advertisementReducer(
      initialState,
      fetchAdvertisementIdSuccess(mockAdvertisement)
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(null);
    expect(nextState.advertisement).toEqual(mockAdvertisement);
  });

  it("should handle fetchAdvertisementFailure", () => {
    const error = "Ошибка загрузки";

    const nextState = advertisementReducer(
      initialState,
      fetchAdvertisementFailure(error)
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error);
  });

  it("should handle changePerPage", () => {
    const perPage = 10;

    const nextState = advertisementReducer(
      initialState,
      changePerPage(perPage)
    );

    expect(nextState.itemsPerPage).toBe(perPage);
  });

  it("should handle changeCurrentPage", () => {
    const currentPage = 2;

    const nextState = advertisementReducer(
      initialState,
      changeCurrentPage(currentPage)
    );

    expect(nextState.currentPage).toBe(currentPage);
  });
});
