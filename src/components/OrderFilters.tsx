import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { OrderStatus } from "../utils/types";
import { FC } from "react";
import "../styles/components/OrderFilters.sass";

interface OrderFiltersProps {
  statusFilter: string;
  sortOrder: string | null;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
  onSortOrderChange: (event: SelectChangeEvent<string>) => void;
}

export const OrderFilters: FC<OrderFiltersProps> = ({
  statusFilter,
  sortOrder,
  onStatusChange,
  onSortOrderChange,
}) => {
  return (
    <Box className="order_filters">
      <FormControl className="order_filters__control" sx={{ mr: 4 }}>
        <InputLabel id="status-select-label">Статус</InputLabel>
        <Select
          labelId="status-select-label"
          value={statusFilter}
          onChange={onStatusChange}
          label="Статус"
        >
          <MenuItem value="">Все</MenuItem>
          {Object.keys(OrderStatus).map((status) => (
            <MenuItem
              key={status}
              value={OrderStatus[status as keyof typeof OrderStatus]}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className="order_filters__control">
        <InputLabel id="sort-select-label">Сортировать</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortOrder ?? ""}
          onChange={onSortOrderChange}
          label="Сортировать"
        >
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
          <MenuItem value="">Без фильтра</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
