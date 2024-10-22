import { stat } from "fs"
import { useAppSelector } from "../../features/store/configureStore"
import { Login } from "@mui/icons-material";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";

export default function RequireAuth() {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }
    else {
        return <Outlet />

    }
}