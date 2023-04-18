import React, { useCallback, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu } from "@mui/icons-material";
import { TodolistsList } from "../features/TodolistList/TodolistsList";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackBar";
import { useAppSelector } from "../custom_hooks/useAppSelector";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { useAppDispatch } from "../custom_hooks/useAppDispatch";
import { logoutTC } from "../features/Login/auth-reducer";

type AppPropsType = {
  demo?: boolean;
};
export const App: React.FC<AppPropsType> = ({ demo = false, ...props }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInitialized = useAppSelector<boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.authData.isLoggedIn
  );

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  if (!isInitialized)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <CircularProgress size={50} />
      </div>
    );
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList demo={demo} />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/404"}
            element={
              <h1 style={{ textAlign: "center" }}>404 page not found</h1>
            }
          />
          <Route path={"*"} element={<Navigate replace to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
};
