import { createBrowserRouter, Navigate } from "react-router-dom";
import Welcome from "../views/welcome";
import NotFound from "../views/NotFound";
import Login from "../views/login";
import Layout from "../layout";

import Dashboard from "../views/dashboard";
import User from "../views/user";
import Department from "../views/dept";
import Menu from "../views/menu";
import Role from "../views/role";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/welcome", element: <Welcome /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/user-list", element: <User /> },
      { path: "/role-management", element: <Role /> },
      { path: "/dept-management", element: <Department /> },
      { path: "/menu-list", element: <Menu /> },
      { path: "/", element: <Welcome /> },
    ],
  },
  { path: "/", element: <Navigate to="/" /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
