import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { products } from "../models/Products";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeContext } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { useStoreContext } from "../context/storecontext";
import { getCookie } from "../util/util";
import agent from "../../api/agent";
import { useAppDispatch, useAppSelector } from "../../features/store/configureStore";
import { useDispatch } from "react-redux";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../account/accountSlice";


function App() {



  // const { setBasket } = useStoreContext();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const [loading, setLoading] = useState(true);


  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkmode] = useState(false);
  const palettetype = darkMode ? 'dark' : 'light';

  const theme = createTheme(
    {
      palette: {
        mode: palettetype
      }
    }
  )

  function handleChange() {
    setDarkmode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handlechange={handleChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;



