import { Tabs, Tab, AppBar, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import "../styles/components/NavBar.sass";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("/advertisements");

  useEffect(() => {
    if (location.pathname === "/advertisements") {
      setValue("/advertisements");
    } else if (location.pathname === "/orders") {
      setValue("/orders");
    }
  }, [location.pathname]);

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box className="nav_bar">
      <AppBar
        className="nav_bar__app_bar"
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          flexDirection: "row",
        }}
      >
        <Box className="nav_bar__logo_box">
          <img
            src="https://grizly.club/uploads/posts/2022-12/1671105251_grizly-club-p-avito-logotip-png-3.png"
            alt="Logo"
            className="nav_bar__logo"
            onClick={handleLogoClick}
          />
        </Box>
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Объявления" value="/advertisements" />
          <Tab label="Заказы" value="/orders" />
        </Tabs>
      </AppBar>
    </Box>
  );
};
