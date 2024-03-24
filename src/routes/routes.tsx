import { createBrowserRouter } from "react-router-dom";
import Products from "../views/Products";
import PageNotfound from "../views/PageNotfound";
import View from "../views/View";
import AddProduct from "../views/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/view",
    element: <View />,
  },
  {
    path: "/products/add",
    element: <AddProduct />,
  },
  {
    path: "*",
    element: <PageNotfound />,
  },
]);
