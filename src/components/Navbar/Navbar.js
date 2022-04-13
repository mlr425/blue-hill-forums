import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { getLocalStorageUser } from "../Utilities/UtilsJS/UtilJS";

const Navbar = () => {
  const [user, setUser] = useState(getLocalStorageUser());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    //check if jwt expired (1hr login)
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(getLocalStorageUser());
  }, [location]); // dont include user?.token or logout as dependencies

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
  };

  const goToProfile = () => {
    navigate(`/profile/${user?.result?.googleId || user?.result?._id}`);
  };

  //#a0d468 grass
  //#5d9cec blue
  return (
    <AppBar
      position="static"
      sx={{
        margin: "30px 0",
        display: "flex",
        backgroundColor: "#5d9cec",
        borderRadius: 5,
      }}
    >
      <Typography
        sx={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
        component={Link}
        to="/"
        variant="h2"
        align="center"
      >
        Blue Hill Forums
      </Typography>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              sx={{ cursor: "pointer" }}
              onClick={goToProfile}
              alt={user?.result?.name}
              src={user?.result?.imageUrl}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography
              sx={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={goToProfile}
              variant="h6"
            >
              {user?.result?.name}
            </Typography>
            <Button
              sx={{ marginLeft: "20px" }}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
