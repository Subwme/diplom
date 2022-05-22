import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../store";

interface IProps extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children, ...rest }: IProps) => {
  const isAdmin = useAppSelector((state) => {
    if (state.user === null) {
      return false;
    }
    return state.user.isAdmin;
  });

  return (
    <Route {...rest} render={() => (isAdmin ? children : "403 forbidden")} />
  );
};
