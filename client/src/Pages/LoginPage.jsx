import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * @description LoginPage component provides a form for user login.
 * @returns {JSX.Element} The rendered component.
 */
function LoginPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {isAuthenticated, singin, errors: loginErrors} = useAuth();
    const navigate = useNavigate();

    /**
     * @description Handles form submission and triggers the signup function.
     * @param {object} data The data submitted from the form.
     */
    const onSubmit = handleSubmit( async (data) => {
        await singin(data);
    });

    /**
     * @description When the form is submitted the user is redirected to the page products
     */
    useEffect(() => {
        if(isAuthenticated) navigate('/products');
    }, [isAuthenticated, navigate]);

  return (
    <div>
        <div>
            {
                loginErrors.map((error, i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
            <h1>Login</h1>

            <form onSubmit={onSubmit}>

                <input type="email" 
                {... register('email', {required: true})}
                placeholder='Email'/>
                {
                    errors.email && (
                        <p>Email is required</p>
                    )
                }

                <input type="password" 
                {... register('password', {required: true})}
                placeholder='Password'/>
                {
                    errors.password && (
                        <p>Password is required</p>
                    )
                }

                <button type='submit'>Login</button>

            </form>
            <p>
                Don't have an account? <Link to="/register">Sing up</Link>
            </p>
        </div>
    </div>
  )
}

export default LoginPage;