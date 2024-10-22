import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValue, FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';


import { validationSchema } from "./CheckoutValidator"
import agent from "../../api/agent";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        case 2:
            return <PaymentForm />;
        default:
            throw new Error('Unknown step');
    }
}


export default function CheckoutPage() {

    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const currentValidation = validationSchema[activeStep];

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(currentValidation)
    });

    const handleNext = async (data: FieldValues) => {
        console.log("handlenext", activeStep);

        try {
            const { nameOnCard, saveAddress, ...shippingAddress } = data;

            if (activeStep === steps.length - 1) {
                console.log("Last step", shippingAddress);

                const orderNo = await agent.Orders.createOrder({ saveAddress, shippingAddress });

                setOrderNumber(orderNo);
                setActiveStep(activeStep + 1);
            }
            else {
                setActiveStep(activeStep + 1);

            }
        }
        catch (error) {
            console.log(error);
        }

    };

    const handleBack = () => {
        console.log("in handle back");
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #{orderNumber}. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </>
                    ) : (
                        <>
                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        type="submit" sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </form>
                        </>

                    )}
                </>
            </Paper>
        </FormProvider>
    );
}
