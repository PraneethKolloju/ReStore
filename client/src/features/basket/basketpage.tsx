import { useEffect, useState } from "react"
import { Basket } from "../../app/models/Basket";
import agent from "../../api/agent";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/storecontext";
import BasketSummary from "./basketSummary"
import { currencyConvert } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import { stat } from "fs";
import Baskettable from "./basketTable";

export default function () {
    // const { basket, setBasket, removeItem } = useStoreContext();
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();


    if (status === 'pending') return <LoadingComponent message="Loading..." />

    if (basket?.items == null) return <Typography variant="h3">Basket is empty</Typography>

    return (
        <>
            <Baskettable Items={basket.items} isBasket={true} />
            <Grid container>
                <Grid item md={6}>
                </Grid>
                <Grid item md={6}>
                    <BasketSummary basket={basket} />
                    <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>Proceed to Checkout</Button>
                </Grid>

            </Grid>
        </>
    )
}