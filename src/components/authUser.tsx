import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";
import { IUserDataInterface, setUser } from "../redux/module/user/userSlice";
const blankUser: IUserDataInterface = {
  email: null,
  image: null,
  name: null,
  token: null,
};
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  dispatch(setUser(blankUser));
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
