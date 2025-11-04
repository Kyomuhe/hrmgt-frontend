import { Navigate } from "react-router-dom";
import { getAccessToken } from "../Utils/TokenManager"
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, document.title, window.location.href);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const token = getAccessToken();

    if (!token) {
        console.log("no access token redirecting to login");
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;