import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/ContextAuth/AuthContext";

const ProtectedRoute = () => {
    
    const { isAuthenticated } = useAuth();  
    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />
    }
    return (
        < Outlet />
    )
}

export default ProtectedRoute;