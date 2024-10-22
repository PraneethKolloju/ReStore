import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import Productlist from "../../features/catalog/Productlist";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/Aboutpage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Notfound from "../errors/NotFound";
import Basketpage from "../../features/basket/basketpage";
import CheckoutPage from "../../features/checkout/Checkout";
import Login from "../account/login";
import Register from "../account/register";
import RequireAuth from "../account/requireAuth";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Orders from "../../features/orders/Orders";
import ViewOrder from "../../features/orders/ViewOrder";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <CheckoutWrapper /> },
                    { path: 'orders', element: <Orders /> },
                    { path: 'vieworders/:id', element: <ViewOrder /> }
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'Not-found  ', element: <Notfound /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
            { path: 'basket', element: <Basketpage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> }
        ]

    }
])