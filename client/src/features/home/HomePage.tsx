import { Card, Typography } from "@mui/material";
import CardUI from "../../uiComponents/CardUI";

import homeDesign from "../../uiComponents/homeUI";
import Loader from "../../uiComponents/homeUI";
import restoreLoader from "../../uiComponents/restoreLogoHome";

export default function HomePage() {
    return (
        <Typography variant="h2">
            {/* <CardUI /> */}
            <Loader />
        </Typography>
    )
}