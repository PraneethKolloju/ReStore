import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { products } from "../../app/models/Products";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/storecontext";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { setBasket } from "../basket/basketSlice";
import { toast } from "react-toastify";
interface Props {
    product: products;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    // const { basket, setBasket } = useStoreContext();
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    function HandleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.additem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log())
            .finally(() => setLoading(false));
    }
    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: { font: 'bold', color: 'primary.main' }
                    }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                    title={product.name}
                    image={product.pictureUrl}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        ${(product.price / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand}/{product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={loading} onClick={() => HandleAddItem(product.id)} size="small">Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </>
    )
}