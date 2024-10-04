import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorites/Favorites';
import Order from './pages/Order/Order';
import Success from './pages/Success/Success';
import React, { useEffect, useState } from 'react'; 
import { LoadingProvider } from './Context/LoadingContext';
import Loading from './Components/Loading/Loading';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading after 3 seconds
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  

  return (
    <div>
          <LoadingProvider>

          {loading ? <Loading /> : <RouterProvider router={router} />}

       </LoadingProvider>

    </div>
  );
}

export default App;
