import { Routes, Route, BrowserRouter } from "react-router-dom";
import {AuthProvider} from './Context/AuthContext';

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProductPage from "./Pages/ProductPage";
import ProfilePage from "./Pages/ProfilePage";

import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "./Components/Navbar"; //This could show an error, but it doesn't really an error.

/**
 * @description This function is responsible for the navigation of the application. First, we used
 * a AuthProvider for connecting the respective functions' server. Then we used a BrowserRouter for the
 * navigation and then navbar and routes.
 * @returns Content of the page with all protected by "ProtectedRoutes"
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

            <Route element={<ProtectedRoutes/>}>
              <Route path="/products" element={<ProductPage></ProductPage>}></Route>
              <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
            </Route>

          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
