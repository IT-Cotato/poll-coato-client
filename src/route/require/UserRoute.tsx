import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../path';

export default function UserRoute() {
  const role = localStorage.getItem('role');
  if (role !== 'MEMBER') {
    return <Navigate to={PATH.ADMIN} replace />;
  }
  return <Outlet />;
}
