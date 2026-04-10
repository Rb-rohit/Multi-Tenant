
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const RoleRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/" />;

    const decoded = jwtDecode(token);

    if (!allowedRoles.includes(decoded.role)) {
        return <Navigate to="/dashbooard" />;
    }
    return children;
}

export default RoleRoute;
