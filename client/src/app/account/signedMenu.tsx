import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../features/store/configureStore";
import { signOut } from "./accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import Orders from "../../features/orders/Orders";
import { Link } from "react-router-dom";

export default function SignedMenu() {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                sx={{ typography: 'h7', color: 'inherit' }}
            >
                {user?.email}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to={'./orders'}>My Orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut())
                    dispatch(clearBasket())
                }} >Logout</MenuItem>
            </Menu>
        </div>
    );
}