import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../auth/useUserHook';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner type="full-page-spinner" />;

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
