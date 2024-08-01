import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';

/**
 * @description RegisterPage component provides a form for user registration.
 * @returns {JSX.Element} The rendered component.
 */
function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {singup, errors: registerErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    /**
     * @description Handles form submission and triggers the signup function.
     * @param {object} data The data submitted from the form.
     */
    const onSubmit = handleSubmit(async (data) => {
        await singup(data);
    })

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
                registerErrors.map((error, i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
            
            <h1>Register</h1>

            <form onSubmit={onSubmit}>

                <input type="text" 
                {... register('name', {required: true})}
                placeholder='Name'/>
                {
                    errors.name && (
                        <p>Name is required</p>
                    )
                }

                <input type="text"
                {... register('lastname', {required: true})}
                placeholder='Lastname'/>
                {
                    errors.lastname && (
                        <p>Lastname is required</p>
                    )
                }

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

                <button type='submit'>Register</button>

            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage;