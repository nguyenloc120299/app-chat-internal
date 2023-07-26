import LayoutMain from "Layout";
import Home from "pages/home";
import Register from "pages/register";
import type { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login";
import WrapperRouteComponent from "./WrapperRouteComponent";
const routeList: RouteObject[] = [
  {
    path: "/",
    element: <WrapperRouteComponent element={<LayoutMain />} />,
    children: [
      {
        path: "/",
        element: <WrapperRouteComponent element={<Home />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <WrapperRouteComponent element={<Login />} />,
  },
  {
    path: "/register",
    element: <WrapperRouteComponent element={<Register />} />,
  },
];
const RenderRouter = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
