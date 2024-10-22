import { Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Fragment } from 'react';
import BasketSummary from '../basket/basketSummary';
import Baskettable from '../basket/basketTable';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../store/configureStore';

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {

    const { basket } = useAppSelector(state => state.basket);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {basket &&
                <Baskettable Items={basket?.items} isBasket={false} />
            }
        </>
    );
}
