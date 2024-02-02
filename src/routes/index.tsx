import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/login";
import { SignUp } from "../pages/sign-up";
import Products from "../pages/products";
import Profile from "../pages/profile";
import ProductDetails from "../components/product-details";
import AddNewProduct from "../pages/add-new-product";
import AuthUser from "../components/authUser";
import Home from "../pages/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthUser>
        <App />
      </AuthUser>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "add",
        element: <AddNewProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
