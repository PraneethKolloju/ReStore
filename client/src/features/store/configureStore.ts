import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketslice } from "../basket/basketSlice";
import Catalog from "../catalog/Catalog";
import { catalogSlice } from "../catalog/catalogSlice";
import { AccountSlice } from "../../app/account/accountSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketslice.reducer,
        catalog: catalogSlice.reducer,
        account: AccountSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;