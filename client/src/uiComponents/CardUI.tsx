import React, { useState } from "react";
import { products } from "../app/models/Products";
import agent from "../api/agent";
import { setBasket } from "../features/basket/basketSlice";
import { useAppSelector, useAppDispatch } from "../features/store/configureStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { currencyConvert } from "../app/util/util";

interface Props {
    product: products;
}



const CardUI = ({ product }: Props) => {
    const [loading, setLoading] = useState(false);
    // const { basket, setBasket } = useStoreContext();
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    function HandleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.additem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log())
            .finally(() => { setLoading(false); toast.success("Item added") });
    }
    return (
        <div className="relative flex w-79 flex-col rounded-xl bg-white bg-clip-border text-black-700 shadow-xl">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white  shadow-xl">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={product.pictureUrl}
                        alt={product.name}
                        height={130}
                        width={150}
                        className="object-cover"
                    />
                </div>
            </div>            <div className="p-6">
                <h5 className="mb-2 block font-sans text-sm font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {product.name}
                </h5>

                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {product.brand}/{product.type}
                </p>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {currencyConvert(product.price)}
                </p>
            </div>
            <div className="p-6 pt-0">
                <button
                    data-ripple-light="true"
                    type="button"
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-3"
                    onClick={() => HandleAddItem(product.id)}
                >
                    Add
                </button>
                <Link to={`/catalog/${product.id}`}>                <button
                    data-ripple-light="true"
                    type="button"
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    View
                </button>
                </Link>

            </div>
        </div>
    );
};

export default CardUI;
