import { Typography, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import AppTextInput from "../../components/AppTextInput";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
    const { control } = useFormContext();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <AppTextInput control={control} name="cardName" label="Card Name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AppTextInput control={control} name="cardNumber" label="Card Number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AppTextInput control={control} name="expDate" label="Expired Date" />

                </Grid>
                <Grid item xs={12} md={6}>
                    <AppTextInput control={control} name="cvv" label="CVV" />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </>
    );
}