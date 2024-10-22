import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { products } from "../../app/models/Products";
import ProductCard from "./ProductCard";
import Productlist from "./Productlist";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Label, SosTwoTone } from "@mui/icons-material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "./RadioButtonGroup";
import Checkboxes from "../../components/CheckBoxes";
import useProducts from "../../hooks/useProducts";
import AppPagination from "./AppPagination";


var sortOption = [
  { value: "price", Label: "Price - Low to High" },
  { value: "priceDesc", Label: "Price - High to Low" },
  { value: "Name", Label: "Alphabetical Order" }
]
export default function Catalog() {
  const { products, filtersLoaded, brands, typeList, metaData } = useProducts();
  const { productParams, productsLoaded } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  // if (filtersLoaded == false || !metaData) return <LoadingComponent message="loading..." />

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3} >
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup options={sortOption} selectedValue={productParams.orderBy} onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))} />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <Checkboxes onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))} brands={brands} checked={productParams.brands} />
          </Paper >
          <Paper sx={{ mb: 2, p: 2 }}>
            <Checkboxes onChange={(items: string[]) => dispatch(setProductParams({ typeList: items }))} brands={typeList} checked={productParams.typeList} />
          </Paper>
        </Grid>
        <Grid item xs={9} >
          <Productlist products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9}>
          {metaData &&
            <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />}
        </Grid>
      </Grid>
    </>
  )
}