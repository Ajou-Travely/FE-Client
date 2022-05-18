import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import isLogin from "@utils/isLogin";

interface Props {
  children: ReactElement;
  user: boolean;
}

const PrivateRoute = ({ user, children: Component }: Props) => {
  return isLogin() ? Component : <Navigate to="/signIn" />;
};
export default PrivateRoute;
