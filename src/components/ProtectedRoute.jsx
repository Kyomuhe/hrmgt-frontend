import { Navigate } from "react-router-dom";
import { getAccessToken } from "../Utils/TokenManager"

const ProtectedRoute = ({children}) => {
    const token = getAccessToken();

    if(!token){
        console.log("no access token redirecting to login");
        return <Navigate to="/" replace/>; 
    }
    return children;
}

export default ProtectedRoute;