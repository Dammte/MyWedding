import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../Api/authentication";
import cookie from "js-cookie";

/**
 * @description Context to be used for authentication operations like registering and logging in.
 */
export const AuthContext = createContext();


/**
 * @description Hook to use the AuthContext. Ensures the context is used within an AuthProvider.
 * @returns {object} The authentication context with authentication data and methods.
 * @throws Will throw an error if used outside of an AuthProvider.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used with a authProvider");
    }
    return context;
};

/**
 * @description Component to provide authentication context to its children.
 * @param {object} props The component props.
 * @param {React.ReactNode} props.children The child components that will have access to the auth context.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * @description Function to handle user registration.
     * @param {object} user The user information to register.
     * @returns {Promise<void>}
     */
    const singup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    /**
     * @description Function to handle user login.
     * @param {object} user The user information to login.
     * @returns {Promise<void>}
     */
    const singin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
    }

    /**
     * @description Function to handle user logout.
     */
    const logout = () => {
        cookie.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    /**
     * @description Clears the errors after 5 seconds if there are any errors.
     */
    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    /**
     * @description Checks if the user is logged in by verifying the token from cookies.
     * This effect runs once when the component mounts.
     */
    useEffect(() => {
        async function checkLogin(){
            const cookies = cookie.get();
            if(!cookies){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);  
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                singup,
                singin,
                logout,
                user,
                isAuthenticated,
                errors,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
