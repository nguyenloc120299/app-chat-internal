import type { FC, ReactElement } from "react";
import type { RouteProps } from "react-router";
import PrivateRoute from "./PrivateRoutes";

const WrapperRouteComponent: FC<any> = ({
  title,
  auth,
  ...props
}) => {

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
