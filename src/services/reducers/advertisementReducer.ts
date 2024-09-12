import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement, AdvertisementsRest, Rest } from "../../utils/types";
import { DEFAULT_PAGE, ITEMS_PER_PAGE_DEFAULT } from "../../utils/constants";

interface AdvertisementState {
  advertisements: Advertisement[] | null;
  rest: Rest | null;
  advertisement: Advertisement | null;
  itemsPerPage: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: AdvertisementState = {
  advertisements: null,
  rest: null,
  advertisement: null,
  itemsPerPage: ITEMS_PER_PAGE_DEFAULT,
  currentPage: DEFAULT_PAGE,
  loading: false,
  error: null,
};

const advertisementSlice = createSlice({
  name: "advertisement",
  initialState,
  reducers: {
    fetchAdvertisementStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllAdvertisementSuccess(
      state,
      action: PayloadAction<Advertisement[]>
    ) {
      state.loading = false;
      state.error = null;
      state.advertisements = action.payload;
      state.rest = null;
    },
    fetchAdvertisementSuccess(state, action: PayloadAction<AdvertisementsRest>) {
      state.loading = false;
      state.error = null;
      const { data, ...rest } = action.payload;
      state.advertisements = data;
      state.rest = rest;
    },
    fetchAdvertisementIdSuccess(state, action: PayloadAction<Advertisement>) {
      state.loading = false;
      state.error = null;
      state.advertisement = action.payload;
    },
    fetchAdvertisementFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    changePerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchAdvertisementStart,
  fetchAllAdvertisementSuccess,
  fetchAdvertisementSuccess,
  fetchAdvertisementIdSuccess,
  fetchAdvertisementFailure,
  changePerPage,
  changeCurrentPage,
} = advertisementSlice.actions;

export default advertisementSlice.reducer;
