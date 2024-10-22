import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutWrapper() {

    const stripePromise = loadStripe('pk_test_51Q4O2kRp0ukVjrN0LxuNWrn2pyJoyCQz0mMMqrE4BuU4qIcxCEthQgGd0HvERDLv6Gs4yU4Stf0EqwboIzdlge4z00DH6cO3Fz');

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}