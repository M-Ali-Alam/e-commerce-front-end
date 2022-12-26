import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProductDetails from './pages/product-details/ProductDetails';
import Cart from './pages/cart/Cart';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/home'/>
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/products/:id',
      element: <ProductDetails />
    },
    {
      path: '/cart',
      element: <Cart />
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
