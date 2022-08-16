import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import LOGO from './logo-01.png';
import { ShoppingCart , ExitToAppRounded } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import "./style.css";
const NavBar = ({ basketItems, totalCost }) => {
  const location = useLocation();


  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/products"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src={LOGO}
                alt="Kick's Up logo"
                height="25px"
                className="logo"
              />
              Kick's Up
            </Typography>
            {location.pathname === "/basket" || location.pathname === "/checkout" ? (
              <div className="basket-wrapper">
                <h2>
                  Total cost: <strong>{totalCost}</strong>
                </h2>
              </div>
            ) : (
              <div className="basket-wrapper">
                <IconButton
                  component={Link}
                  to="/basket"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <Badge overlap="rectangular" badgeContent={basketItems} color="secondary">
                    <ShoppingCart className="custom-basket" />
                  </Badge>
                </IconButton>
                <IconButton
                  component={Link}
                  to="/"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <ExitToAppRounded className="custom-basket" /> 
                </IconButton>
              </div> 
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar
