import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, CssBaseline, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import path from "path";
import { title } from "process";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/storecontext";
import { useAppSelector } from "../../features/store/configureStore";
import SignedMenu from "../account/signedMenu";


const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const leftLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

interface Props {
    darkMode: boolean;
    handlechange: () => void;
}

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: 'text.secondary' }

}



export default function Header({ darkMode, handlechange }: Props) {
    // const { basket } = useStoreContext();
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <CssBaseline></CssBaseline>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6" component={NavLink} to={'/'} sx={navStyles}>
                            RE-STORE
                        </Typography>
                        <Switch checked={darkMode} onChange={handlechange} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <List sx={{ display: 'flex' }}>
                            {midLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    <Typography>
                                        {title.toUpperCase()}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton component={NavLink} to="/basket" size="large" color="inherit" sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {user ? (<SignedMenu />)
                            : (
                                <List sx={{ display: 'flex' }}>
                                    {leftLinks.map(({ title, path }) => (
                                        <ListItem
                                            component={NavLink}
                                            to={path}
                                            key={path}
                                            sx={{ color: 'inherit' }}
                                        ><Typography>
                                                {title.toUpperCase()}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    )
}