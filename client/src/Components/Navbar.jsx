import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

/**
 * @description This component renders a navigation bar with different links depending on the authentication state.
 * @returns {JSX.Element} The navigation bar component.
 */
function Navbar() {

    const {isAuthenticated, logout, user} = useAuth();

  return (
    <nav className='Navbar'>
        <Link to={
            isAuthenticated ? ('/products') : ('/') 
        }>
            <h1>My Wedding</h1>
        </Link>
        <ul>
            {
                isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.name}
                        </li>
                        <li>
                            <Link to={'/profile'}>Profile</Link>
                        </li>
                        <li>
                            <Link to={'/'} onClick={ () => {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={'/login'}>login</Link>
                        </li>
                        <li>
                            <Link to={'/register'}>Register</Link>
                        </li>
                    </>
                )
            }
        </ul>

    </nav>
  )
}

export default Navbar;