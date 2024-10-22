import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import agent from '../../api/agent';
import { FieldValues, useForm } from 'react-hook-form';
import { error } from 'console';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../features/store/configureStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { displayPartsToString } from 'typescript';
import { userSign } from './accountSlice';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    marginTop: '10vh',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function submitForm(data: any) {
        try {
            await dispatch(userSign(data));

            var loc = location.state?.from;
            if (loc)
                navigate(location.state?.from || '/login');
            else
                navigate('/catalog' || '/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(submitForm)}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <Typography>Email</Typography>
                        <TextField
                            placeholder="your@email.com"
                            {...register('username', { required: "Username Required" })}
                            error={!!errors.username}
                            helperText={errors?.username?.message as string}
                            autoFocus
                            fullWidth
                            variant="outlined"
                        />

                        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Link
                                component="button"
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box> */}
                        <Typography>Password</Typography>
                        <TextField
                            placeholder="••••••"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', { required: "Password Required" })}
                            error={!!errors.password}
                            helperText={errors?.password?.message as string}
                            autoFocus
                            required
                            fullWidth
                        />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!isValid}
                        >
                            Sign in
                        </LoadingButton>
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <span>
                                <Link
                                    href="/register"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign up
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer >
        </>
    );
}