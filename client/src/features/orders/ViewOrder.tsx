import { useEffect, useState } from "react"
import { Order, OrderItem } from "../../app/models/Order";
import agent from "../../api/agent";
import { Link, useParams } from "react-router-dom";
import { number } from "yup";
import Baskettable from "../basket/basketTable";
import { BasketItem } from "../../app/models/Basket";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { currencyConvert } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ViewOrder() {

    const [OrderItems, setItems] = useState<Order>();
    const [Loading, setLoading] = useState(true);

    const { id } = useParams();

    var OrderId = id ? parseInt(id) : 0;

    useEffect(() => {
        agent.Orders.fetch(OrderId)
            .then(i => setItems(i))
            .catch(errors => console.log(errors))
            .finally(() => setLoading(false))
    }, [])

    const items = OrderItems?.orderItems;


    let subtotal = items?.reduce((total, item) => total + ((item.price / 100) * item.quantity), 0) ?? 0;
    let deliveryFee = 0;
    if (subtotal == 0)
        deliveryFee = 0;
    else if (subtotal < 100)
        deliveryFee = 60;

    console.log(items);

    if (Loading) return <LoadingComponent message="Loading..." />

    return (
        <>
            <>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item md={6}>
                        <Typography>Order No #{OrderItems?.id}</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Button component={Link} to='/orders'>Back to orders</Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box display="flex" alignItems="center">
                                            <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }}></img>
                                            <span>{row.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{currencyConvert(row.price)}</TableCell>
                                    <TableCell align="right">

                                        {row.quantity}

                                    </TableCell>

                                    <TableCell align="right">{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>




                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} variant={'outlined'}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{subtotal}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Delivery fee*</TableCell>
                                <TableCell align="right">{deliveryFee}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </>
    )
}