import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../path';

export default function AdminRoute() {
  const role = localStorage.getItem('role');
  if (role !== 'ADMIN') {
    return <Navigate to={PATH.VOTE} replace />;
  }
  return <Outlet />;
}
