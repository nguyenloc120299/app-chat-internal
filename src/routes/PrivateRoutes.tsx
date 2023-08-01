import type { FC } from "react";
import type { RouteProps } from "react-router";

import { Button, Result } from "antd";

import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store";

const PrivateRoute: FC<RouteProps> = (props) => {
  const {user} = useAppSelector((state)=>state.app) as any;
  return user ? (props.element as React.ReactElement) : <div>21212</div>;
};

export default PrivateRoute;
