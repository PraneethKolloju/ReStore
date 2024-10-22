import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ProductParams, products } from "../../app/models/Products";
import agent from "../../api/agent";
import { RootState } from "../store/configureStore";
import ProductDetails from "./ProductDetails";
import { Console } from "console";
import { MetaData } from "../../app/models/Pagination";
import { stat } from "fs";


const productsAdapter = createEntityAdapter<products>();


function getParams(productParams: ProductParams) {
    const UrlParams = new URLSearchParams();
    if (productParams.pageNumber) UrlParams.append("pageNumber", productParams.pageNumber.toString());
    if (productParams.pageSize) UrlParams.append("pageSize", productParams.pageSize.toString());
    if (productParams.searchTerm) UrlParams.append("searchTerm", productParams.searchTerm);
    if (productParams.orderBy) UrlParams.append("orderBy", productParams.orderBy);
    if (productParams.brands.length > 0) UrlParams.append("brands", productParams.brands.toString());
    if (productParams.typeList.length > 0) UrlParams.append("typeList", productParams.typeList.toString());

    return UrlParams;
}



interface catalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    brands: string[];
    status: string;
    typeList: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

export const fetchProductsAsync = createAsyncThunk<products[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getParams(thunkAPI.getState().catalog.productParams);

        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFiltersAsync',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.filters();
        }
        catch (error) {
            console.log(error);
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        typeList: []

    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<catalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        brands: [],
        typeList: [],
        status: 'idle',
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload }
        },
        setMetaData: (state, action) => {
            state.metaData = { ...state.metaData, ...action.payload }
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = "idle";
        });
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.typeList = action.payload.typeList;
            state.filtersLoaded = true;
        });

        builder.addCase(fetchFiltersAsync.rejected, (state) => {
            state.status = 'rejected';
        })

    })
})


export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;