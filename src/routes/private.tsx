import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import isLogin from "@utils/isLogin";

interface Props {
  children: ReactElement;
}

const PrivateRoute = ({ children: Component }: Props) => {
  return true ? Component : <Navigate to="/signIn" />;
};
export default PrivateRoute;
