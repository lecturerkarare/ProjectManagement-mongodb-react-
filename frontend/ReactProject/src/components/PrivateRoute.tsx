import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth/login");
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
