import type { FC } from "react";
import type { RouteProps } from "react-router";

import { Button, Result } from "antd";

import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const PrivateRoute: FC<RouteProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logged = true;
  
  return logged ? (props.element as React.ReactElement) : <div>21212</div>;
};

export default PrivateRoute;
