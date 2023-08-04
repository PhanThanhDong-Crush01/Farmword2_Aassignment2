import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./Page/Layouts/Admin";
import { LayoutClient } from "./Page/Layouts/Client";
import { HomePage } from "./Page/Client/Home";
import { Shop } from "./Page/Client/Shop";
import { ProductDetail } from "./Page/Client/Product_detail";
import { AdminProducts } from "./Page/Admin/Product/Products";
import { DarhBoash } from "./Page/Admin/Dashboard";
import { AdminProductAdd } from "./Page/Admin/Product/Product_add";
import { AdminProductEdit } from "./Page/Admin/Product/Product_edit";
import { AdminCategories } from "./Page/Admin/Category/Categories";
import { AdminCategoryAdd } from "./Page/Admin/Category/Category_add";
import { AdminCategoryEdit } from "./Page/Admin/Category/Category_edit";
import Cart from "./Page/Client/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <Shop /> },
      { path: "shop/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <DarhBoash /> },
      { path: "product", element: <AdminProducts /> },
      { path: "product/add", element: <AdminProductAdd /> },
      { path: "product/:id/edit", element: <AdminProductEdit /> },
      { path: "category", element: <AdminCategories /> },
      { path: "category/add", element: <AdminCategoryAdd /> },
      { path: "category/:id/edit", element: <AdminCategoryEdit /> },
    ],
  },
]);
