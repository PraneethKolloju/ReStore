import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { Basket } from "../../app/models/Basket"
import agent from "../../api/agent"
import { access, stat } from "fs"
import { AccessTime } from "@mui/icons-material"
import { connected } from "process"
import { getCookie } from "../../app/util/util"
import { fetchCurrentUser } from "../../app/account/accountSlice"

interface BasketState {
    basket: Basket | null,
    status: String
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            return agent.Basket.additem(productId, quantity)
        }
        catch (error) {
            console.log(error)
        }
    },
    {
        // condition: () => {
        //     if (!getCookie("buyerId")) {
        //         console.log("in condition");
        //         return false;
        //     }
        // }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity?: number, }>(
    'basket/removeBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
        try {
            return agent.Basket.removeitem(productId, quantity)
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error) {
            console.log("error");
        }
    },
)

export const basketslice = createSlice({
    name: 'basket',
    initialState,
    reducers:
    {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const Index = state.basket?.items.findIndex(i => i.productId == productId);
            if (Index === -1 || Index === undefined) return;
            state.basket!.items[Index].quantity -= quantity!;
            if (state.basket!.items[Index].quantity === 0)
                state.basket?.items.splice(Index, 1);
            state.status = 'idle';
        });

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'pendingRemoveItem';
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.fulfilled), (state) => {
            state.status = 'rejected';
        });
    })
})

export const { setBasket, clearBasket } = basketslice.actions;
