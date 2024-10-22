import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../app/models/Order";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyConvert } from "../../app/util/util";
import { Link } from "react-router-dom";


export default function Orders() {

    const [Loading, setLoading] = useState(true);
    const [Orders, setOrders] = useState<Order[] | null>();

    useEffect(() => {
        agent.Orders.list()
            .then(i => setOrders(i))
            .catch(errors => console.log(errors))
            .finally(() => setLoading(false))

    }, [])

    if (Loading) return <LoadingComponent message="Loading Orders ..." />

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Orders?.map((Order) => (
                            <TableRow
                                key={Order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {Order.id}
                                </TableCell>
                                <TableCell align="right">{currencyConvert(Order.total)}</TableCell>
                                <TableCell align="right">{Order.orderDate.split('T')[0]}</TableCell>
                                <TableCell align="right">{Order.orderStatus}</TableCell>
                                <TableCell align="right"><Button component={Link} to={`/vieworders/${Order.id}`}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}