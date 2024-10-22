import { debounce, TextField } from "@mui/material";
import { productSelectors, setProductParams } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useState } from "react";


export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchterm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();
    const ebounce = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000);
    return (
        <>
            <TextField label="Search Filters" variant="outlined" fullWidth value={searchTerm || ""} onChange={(event: any) => {
                setSearchterm(event.target.value);
                ebounce(event);
            }} />
        </>

    )
}