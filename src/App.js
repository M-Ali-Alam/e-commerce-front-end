import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProductDetails from "./pages/product-details/ProductDetails";
import Cart from "./pages/cart/Cart";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import UpdateProduct from "./pages/products/UpdateProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/products/:id",
      element: <ProductDetails />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/addProduct/:id",
      element: <UpdateProduct />,
    },
    {
      path: "/addProduct",
      element: <AddProduct />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
