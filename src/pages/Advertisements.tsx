import {
  Container,
  Typography,
  Grid2,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  SelectChangeEvent,
  IconButton,
  debounce,
} from "@mui/material";
import { MouseEvent } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AdvertismentItem } from "../components/AdvertisementItem";
import { RootState, useDispatch, useSelector } from "../services/store";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { DEFAULT_PAGE, ITEMS_PER_PAGE_OPTIONS } from "../utils/constants";
import { AddAdvertisementModal } from "../components/AddAdvertisementModal";
import { NewAdvertisement } from "../utils/types";
import {
  fetchAdvertisements,
  fetchAdvertismentAdd,
  fetchAllAdvertisements,
} from "../api/advertisementApi";
import { changePerPage } from "../services/reducers/advertisementReducer";

import "../styles/pages/Advertisements.sass";
import { FilterMenu } from "../components/FilterMenu";

export const Advertisements = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { advertisements, rest, itemsPerPage } = useSelector(
    (state: RootState) => state.advertisment
  );

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [priceFrom, setPriceFrom] = useState<number | undefined>();
  const [priceTo, setPriceTo] = useState<number | undefined>();
  const [viewsFrom, setViewsFrom] = useState<number | undefined>();
  const [viewsTo, setViewsTo] = useState<number | undefined>();
  const [likesFrom, setLikesFrom] = useState<number | undefined>();
  const [likesTo, setLikesTo] = useState<number | undefined>();

  const { handlePageChange } = usePagination(currentPage, rest, itemsPerPage);

  const dispatch = useDispatch();

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setSearchTerm(query);
        dispatch(fetchAllAdvertisements());
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchAdvertisements({ perPage: itemsPerPage, page: currentPage }));
  }, [dispatch, itemsPerPage, currentPage]);

  const handleItemsPerPage = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    dispatch(changePerPage(newItemsPerPage));
    setCurrentPage(DEFAULT_PAGE);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAdd = (newAd: NewAdvertisement) => {
    dispatch(fetchAdvertismentAdd(newAd, currentPage, itemsPerPage));
  };

  const handleOpenFilterMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const applyFilters = (filters: {
    priceFrom?: number;
    priceTo?: number;
    viewsFrom?: number;
    viewsTo?: number;
    likesFrom?: number;
    likesTo?: number;
  }) => {
    setPriceFrom(filters.priceFrom);
    setPriceTo(filters.priceTo);
    setViewsFrom(filters.viewsFrom);
    setViewsTo(filters.viewsTo);
    setLikesFrom(filters.likesFrom);
    setLikesTo(filters.likesTo);
  };

  const resetFilters = () => {
    setPriceFrom(undefined);
    setPriceTo(undefined);
    setViewsFrom(undefined);
    setViewsTo(undefined);
    setLikesFrom(undefined);
    setLikesTo(undefined);
    dispatch(fetchAdvertisements({ perPage: itemsPerPage, page: currentPage }));
  };

  if (!advertisements) {
    return (
      <Container className="advertisements__empty">
        <Typography>Корзина пустая..</Typography>
      </Container>
    );
  }

  const filteredOrders =
    advertisements &&
    advertisements.filter(
      (advertisement) =>
        advertisement.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceFrom === undefined || advertisement.price >= priceFrom) &&
        (priceTo === undefined || advertisement.price <= priceTo) &&
        (viewsFrom === undefined || advertisement.views >= viewsFrom) &&
        (viewsTo === undefined || advertisement.views <= viewsTo) &&
        (likesFrom === undefined || advertisement.likes >= likesFrom) &&
        (likesTo === undefined || advertisement.likes <= likesTo)
    );

  return (
    <Container>
      <Box className="advertisements__container">
        <TextField
          label="Поиск по названию"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="advertisements__search_field"
        />
        <FormControl
          className="advertisements__items_per_page"
          sx={{ minWidth: 120, ml: 4 }}
        >
          <InputLabel variant={"filled"}>На странице</InputLabel>
          <Select
            variant={"filled"}
            value={itemsPerPage}
            onChange={handleItemsPerPage}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton sx={{ ml: 2 }} onClick={handleOpenFilterMenu}>
          <FilterListIcon />
        </IconButton>
        <FilterMenu
          anchorEl={anchorEl}
          handleClose={handleCloseFilterMenu}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />
      </Box>
      <Grid2 container spacing={2}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((item) => (
            <Grid2
              key={item.id}
              className="advertisements__advertisement_grid"
              size={6}
            >
              <AdvertismentItem item={item} />
            </Grid2>
          ))
        ) : (
          <Typography>Нет объявлений</Typography>
        )}
      </Grid2>
      <Button
        onClick={handleOpen}
        className="advertisements__add_button"
        sx={{ display: "block", m: "20px auto 0" }}
      >
        Добавить объявление
      </Button>
      <AddAdvertisementModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleAdd}
      />
      {rest && (
        <Pagination
          count={rest ? rest.pages : 1}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
            handlePageChange(event, value);
          }}
          className="advertisements__pagination"
        />
      )}
    </Container>
  );
};
