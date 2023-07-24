import { Link, useRouteError } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorJson from '../../assets/error-404.json';

const ErrorPage = () => {
    const { error } = useRouteError();

    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <div className='flex justify-center'>
                    <Lottie animationData={errorJson} loop={true} />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-error me-4'>{error?.message}</p>
                    <Link to='/'>
                        <button className='btn btn-primary mt-4'>Back to homepage</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;