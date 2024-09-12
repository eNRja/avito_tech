import { ChangeEvent, useState } from "react";
import { fetchAdvertisements } from "../api/advertisementApi";
import { useDispatch } from "../services/store";
import { DEFAULT_PAGE } from "../utils/constants";
import { Rest } from "../utils/types";

export const usePagination = (
  initialPage = DEFAULT_PAGE,
  orders: Rest | null,
  itemsPerPage: number
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const dispatch = useDispatch();

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (orders) {
      const pageUrl = value > currentPage ? orders.next : orders.prev;
      if (pageUrl) {
        dispatch(
          fetchAdvertisements({ page: pageUrl, perPage: itemsPerPage })
        );
      }
    }
  };

  return { currentPage, handlePageChange };
};
