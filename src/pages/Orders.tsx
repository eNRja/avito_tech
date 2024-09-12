import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Container,
  CircularProgress,
  SelectChangeEvent,
  Pagination,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllOrders, fetchUpdateOrder } from "../api/ordersApi";
import { Order } from "../utils/types";
import { RootState, useDispatch, useSelector } from "../services/store";
import { OrderFilters } from "../components/OrderFilters";
import { OrderList } from "../components/OrderList";
import { OrderModal } from "../components/OrderModal";
import "../styles/pages/Orders.sass";

export const Orders = () => {
  const { orders, loading } = useSelector((state: RootState) => state.order);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get("item");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    let result = orders;

    if (itemId) {
      result = result.filter((order) =>
        order.items.some((item) => item.id === itemId)
      );
    }

    result = result
      .filter((order) =>
        statusFilter !== "" ? order.status === Number(statusFilter) : true
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.total - b.total
          : sortOrder === "desc"
          ? b.total - a.total
          : 0
      );

    return result;
  }, [orders, statusFilter, sortOrder, itemId]);

  const paginatedOrders = useMemo(() => {
    if (!filteredOrders) {
      return [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleComplete = (order: Order) => {
    const updatedOrder: Order = { ...order, status: 5 };
    dispatch(fetchUpdateOrder(updatedOrder));
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!orders) {
    return <Typography>Что-то пошло не так..</Typography>;
  }

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <OrderFilters
            statusFilter={statusFilter}
            sortOrder={sortOrder}
            onStatusChange={handleStatusFilterChange}
            onSortOrderChange={handleSortOrderChange}
          />
          <OrderList
            orders={paginatedOrders}
            onOrderClick={handleOpenModal}
            onCompleteOrder={handleComplete}
          />
          {selectedOrder && (
            <OrderModal
              open={open}
              handleClose={handleCloseModal}
              items={selectedOrder.items}
              id={selectedOrder.id}
            />
          )}
          {paginatedOrders.length === 0 && (
            <Container className="orders__empty">
              <Typography>К сожалению заказов не нашлось..</Typography>
              <Button onClick={handleBack}>Вернуться назад</Button>
            </Container>
          )}
          <Pagination
            count={Math.ceil(
              filteredOrders ? filteredOrders.length / itemsPerPage : 1
            )}
            page={currentPage}
            onChange={handlePageChange}
            className="orders__pagination"
          />
        </>
      )}
    </Container>
  );
};
