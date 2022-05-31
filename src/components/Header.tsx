import { Menu } from "@mui/icons-material";
import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit">
            <Menu />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
