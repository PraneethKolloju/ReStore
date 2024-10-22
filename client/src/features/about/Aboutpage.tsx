import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../api/agent";

export default function AboutPage() {
    return (
        <Container>
            <Typography>Errors for testing</Typography>
            <ButtonGroup>
                <Button variant="contained" onClick={() => agent.TestErrors.Get404Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.GetBadRequestError().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.GetUnAuthorisedError().catch(error => console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.GetServerError().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.GetValidationError().catch(error => console.log(error))}>Test Validation</Button>

            </ButtonGroup>
        </Container>
    )
}