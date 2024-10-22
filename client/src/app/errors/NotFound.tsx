import { Container, Paper, Typography } from "@mui/material";

export default function Notfound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography variant="h3">We could'nt find what you are looking for found </Typography>
        </Container>
    )
}