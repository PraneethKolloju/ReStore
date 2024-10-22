import { Button, ButtonGroup, Typography } from "@mui/material";
import { store, useAppDispatch, useAppSelector } from "../store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function AboutPage() {

    const dispatch = useAppDispatch();

    const { data, title } = useAppSelector(state => state.counter);


    return (
        <>
            <Typography variant="h2">
                The Data is {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))}>Decrement</Button>
                <Button onClick={() => dispatch(increment(1))}>increment</Button>
                <Button onClick={() => dispatch(increment(5))}>increment by 5</Button>

            </ButtonGroup>
        </>
    )
}