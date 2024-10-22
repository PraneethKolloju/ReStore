import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../app/models/Products";
import { error } from "console";
import agent from "../../api/agent";
import { setPriority } from "os";
import Notfound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ButtonUI from "../../uiComponents/buttonUI";

export default function ProductDetails() {

    const [product, setproduct] = useState<products | null>(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id && agent.Catalog.details(parseInt(id)).then(details => setproduct(details))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <LoadingComponent />

    if (!product) return <Notfound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color='secondary.main'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Desciption</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                            <Link to={`/catalog`}><ButtonUI /></Link>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

