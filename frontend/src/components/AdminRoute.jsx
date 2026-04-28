import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';
import AccessDenied from '../pages/AccessDenied';

export default function AdminRoute({ bare = false }) {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in → bounce to login, remembering where they wanted to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Logged in but not an admin → show a clear "Access Denied" page
  if (!user.isAdmin) {
    return <AccessDeniedWithToast />;
  }

  if (bare) return <Outlet />;
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

// Shows the AccessDenied page once and fires a toast notification
function AccessDeniedWithToast() {
  useEffect(() => {
    toast.error('Admins only — this area is restricted.', { id: 'admin-denied' });
  }, []);
  return <AccessDenied />;
}
