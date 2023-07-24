import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Lottie from 'lottie-react';
import loadingJson from '../assets/loading-dots.json';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[calc(100vh-75px)]'>
                <p className='text-7xl font-thin'>L</p>
                <div className='w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-blue-400'></div>
                <p className='text-7xl font-thin'>ading</p>
                <div className='w-60 h-60 mt-36 -ml-20'><Lottie animationData={loadingJson} loop={true} /></div>
            </div>
        );
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;