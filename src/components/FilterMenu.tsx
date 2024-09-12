import { Menu, Box, Typography, TextField, Button } from "@mui/material";
import { FC, useState } from "react";
import { fetchAllAdvertisements } from "../api/advertisementApi";
import { useDispatch } from "../services/store";

interface FilterMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  onApplyFilters: (filters: {
    priceFrom?: number;
    priceTo?: number;
    viewsFrom?: number;
    viewsTo?: number;
    likesFrom?: number;
    likesTo?: number;
  }) => void;
  onResetFilters: () => void;
}

export const FilterMenu: FC<FilterMenuProps> = ({
  anchorEl,
  handleClose,
  onApplyFilters,
  onResetFilters,
}) => {
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [viewsFrom, setViewsFrom] = useState<string>("");
  const [viewsTo, setViewsTo] = useState<string>("");
  const [likesFrom, setLikesFrom] = useState<string>("");
  const [likesTo, setLikesTo] = useState<string>("");

  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    dispatch(fetchAllAdvertisements());
    onApplyFilters({
      priceFrom: priceFrom ? Number(priceFrom) : undefined,
      priceTo: priceTo ? Number(priceTo) : undefined,
      viewsFrom: viewsFrom ? Number(viewsFrom) : undefined,
      viewsTo: viewsTo ? Number(viewsTo) : undefined,
      likesFrom: likesFrom ? Number(likesFrom) : undefined,
      likesTo: likesTo ? Number(likesTo) : undefined,
    });
    handleClose();
  };

  const handleResetFilters = () => {
    setPriceFrom("");
    setPriceTo("");
    setViewsFrom("");
    setViewsTo("");
    setLikesFrom("");
    setLikesTo("");
    onResetFilters();
    handleClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <Box sx={{ p: 2, width: 300 }}>
        <Typography gutterBottom>Цена</Typography>
        <TextField
          label="От"
          variant="outlined"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <TextField
          label="До"
          variant="outlined"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <Typography gutterBottom>Просмотры</Typography>
        <TextField
          label="От"
          variant="outlined"
          value={viewsFrom}
          onChange={(e) => setViewsFrom(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <TextField
          label="До"
          variant="outlined"
          value={viewsTo}
          onChange={(e) => setViewsTo(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <Typography gutterBottom>Лайки</Typography>
        <TextField
          label="От"
          variant="outlined"
          value={likesFrom}
          onChange={(e) => setLikesFrom(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <TextField
          label="До"
          variant="outlined"
          value={likesTo}
          onChange={(e) => setLikesTo(e.target.value)}
          type="number"
          fullWidth
          margin="dense"
        />
        <Button
          onClick={handleApplyFilters}
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 1 }}
        >
          Применить
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Сбросить фильтры
        </Button>
      </Box>
    </Menu>
  );
};
