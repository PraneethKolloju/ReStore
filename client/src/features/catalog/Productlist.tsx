import { Grid, List } from "@mui/material";
import { products } from "../../app/models/Products";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../store/configureStore";
import { stat } from "fs";
import ProductCardSkeleton from "./ProductSkeleton";
import CardUI from "../../uiComponents/CardUI";

interface Props {
    products: products[];
}

export default function Productlist({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <>
            <Grid container spacing={5} >
                {products.map(product => (
                    <Grid item xs={4} key={product.id}>
                        {!productsLoaded ?
                            (<ProductCardSkeleton />
                            )
                            : (<CardUI product={product} />

                            )
                        }
                    </Grid>
                ))}
            </Grid>
        </>
    )
}