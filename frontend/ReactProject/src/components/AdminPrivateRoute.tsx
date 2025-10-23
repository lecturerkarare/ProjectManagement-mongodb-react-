import React, { ReactNode, useEffect } from 'react';
import { isAdmin } from '../utils/util';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}
const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isuserAdmin = isAdmin();

    if (isuserAdmin) {
      return;
    } else {
      navigate('/auth/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AdminPrivateRoute;
