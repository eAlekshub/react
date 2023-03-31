import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ userRole }) => {
	const user = useSelector((state) => state.user);
	return user.role === userRole ? <Outlet /> : <Navigate to='courses' />;
};

export default PrivateRoute;
