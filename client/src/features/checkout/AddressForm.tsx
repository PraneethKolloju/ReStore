import { Typography, Grid, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";

export default function AddressForm() {
    const { control } = useFormContext();
    console.log(control);
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} label="fullName" name="fullName" />
                </Grid>

                <Grid item xs={12}>
                    <AppTextInput control={control} label="Address 1" name="address1" />

                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} label="Address 2" name="address2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} label="city" name="city" />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} label="State" name="state" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} label="Zip" name="zip" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} label="Country" name="country" />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>

        </>
    );
}
