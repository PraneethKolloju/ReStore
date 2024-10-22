import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { currencyConvert } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/Basket";
import { useAppDispatch, useAppSelector } from "../store/configureStore";


interface Props {
    Items: BasketItem[],
    isBasket: boolean
}

export default function Baskettable({ Items, isBasket }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    let subtotal = Items.reduce((total, item) => total + ((item.price / 100) * item.quantity), 0)
    let deliveryFee = 0;
    if (subtotal == 0)
        deliveryFee = 0;
    else if (subtotal < 100)
        deliveryFee = 60;
    return (
        <>
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
                        {Items.map((row) => (
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
                                    {isBasket &&

                                        <LoadingButton color="error" loading={status === 'pendingRemoveItem' + row.productId} onClick={() => dispatch(removeBasketItemAsync({ productId: row.productId, quantity: 1 }))}>
                                            <Remove />
                                        </LoadingButton>
                                    }
                                    {row.quantity}
                                    {isBasket &&

                                        <LoadingButton color="error" loading={status === 'pendingAddItem' + row.productId} onClick={() => dispatch(addBasketItemAsync({ productId: row.productId, quantity: 1 }))}>
                                            <Add />
                                        </LoadingButton>
                                    }
                                </TableCell>

                                <TableCell align="right">{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
                                {isBasket &&

                                    <TableCell align="right">
                                        <LoadingButton loading={status === 'pendingRemoveItem' + row.productId} color="error" onClick={() => dispatch(removeBasketItemAsync({ productId: row.productId, quantity: row.quantity }))}>
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!isBasket &&
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
            }
        </>
    )
}