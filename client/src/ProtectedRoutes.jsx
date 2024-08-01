import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext"

function ProtectedRoutes() {
    const {isAuthenticated, loading} = useAuth();
    
    if(loading) return(<h1>Loading ...</h1>);

    if(!loading && !isAuthenticated) return <Navigate to="/login" replace></Navigate>

  return <Outlet></Outlet>
}

export default ProtectedRoutes;