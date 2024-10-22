import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { Basket } from "../../app/models/Basket";




interface Props {
    basket: Basket
}


export default function BasketSummary({ basket }: Props) {
    let subtotal = basket.items.reduce((total, item) => total + ((item.price / 100) * item.quantity), 0)
    let deliveryFee = 0;
    if (subtotal == 0)
        deliveryFee = 0;
    else if (subtotal < 100)
        deliveryFee = 60;
    return (
        <>
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
    )
}