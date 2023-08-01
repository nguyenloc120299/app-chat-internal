import LayoutMain from "Layout";
import Home from "pages/home";
import Register from "pages/register";
import type { RouteObject } from "react-router";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import WrapperRouteComponent from "./WrapperRouteComponent";
import { refresh } from "api/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "store/user";
import { useFnLoading, useLoading } from "hooks/useLoading";
import { useAppSelector } from "store";
import { message } from "antd";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { onLoading } = useFnLoading();

  const refreshToken = async () => {
    try {
      onLoading({
        type: "FETCH",
        value: true,
      });
      const res = await refresh();
      if (res) {
        localStorage.setItem("accessToken", res?.accessToken);
        localStorage.setItem("refreshToken", res?.refreshToken);
        dispatch(setUser(res?.user));
      }
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra vui lòng đăng nhập lại")
      onLoading({
        type: "FETCH",
        value: true,
      });
      localStorage.clear();
      navigate("/login");
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      if (location.pathname.includes("/login")) navigate("/");
      refreshToken();
    } else navigate("/login");
  }, []);
  return element;
};

export default RenderRouter;
