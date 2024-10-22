import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../models/User";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { Console, error } from "console";
import { stat } from "fs";
import { Navigate, Route } from "react-router-dom";
import { router } from "../router/Routes";
import { clearBasket, setBasket } from "../../features/basket/basketSlice";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null,
}

const initialState: AccountState = {
    user: null
}


export const userSign = createAsyncThunk<User, { data: FieldValues }>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            console.log("usedto", userDto);
            if (userDto == null) {
                toast.error("Incorrect Credentials");
                router.navigate('/login');
            }
            else {
                const { basket, ...user } = userDto;
                if (basket) thunkAPI.dispatch(setBasket(basket));
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            }
        } catch {
            return "errios";
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/currentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch {
            return "error"
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)


export const AccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.clear();
            router.navigate('/login');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(userSign.rejected, fetchCurrentUser.rejected), (state, action) => {
            console.log(action.payload);
        });

        builder.addMatcher(isAnyOf(userSign.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        })
    })
});

export const { signOut, setUser } = AccountSlice.actions;

