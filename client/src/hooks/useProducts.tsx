import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "../features/catalog/catalogSlice";

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, typeList, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [dispatch, filtersLoaded]);

    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        typeList,
        metaData
    }
}

function fetchFilters(): any {
    throw new Error("Function not implemented.");
}
