import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { saveUser } from '../../api/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loading, googleSignIn, githubSignIn, signIn, resetPassword } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const saveAddress = localStorage.getItem('address') || '/';
    const from = location.state?.from?.pathname || saveAddress;
    localStorage.setItem('address', from);

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Welcome Back!");
                navigate(from, { replace: true });
                reset();
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                saveUser(result.user);
                toast.success("Welcome Back!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            });
    };

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user);
                saveUser(result.user);
                toast.success("Welcome Back!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            });
    };

    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error('Please provide your email address');
            return;
        }
        resetPassword(email)
            .then(() => {
                toast.success('Please check your email');
            })
            .catch(err => {
                console.log(err.message);
                toast.error(err.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Login</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col w-80 md:w-96 p-6 rounded-md sm:p-10 bg-indigo-50 text-gray-900">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Log In</h1>
                        <p className="text-sm text-gray-400">Sign in to access your account</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                                <input type="email" ref={emailRef} {...register("email", { required: true })} name="email" id="email" placeholder="Enter Your Email Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                <input type={show ? "text" : "password"} {...register("password", { required: true })} name="password" id="password" placeholder="*******" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" />
                                <div className='mt-1 flex justify-between'>
                                    <Link className="label-text-alt hover:underline hover:text-indigo-500 text-gray-600" onClick={() => setShow(!show)}>
                                        {
                                            show ? <span>Hide Password</span>: <span>Show Password</span>
                                        }
                                    </Link>
                                    <Link className="label-text-alt hover:underline hover:text-indigo-500 text-gray-600" onClick={handleForgotPassword}>
                                        Forgot password?
                                    </Link>
                                </div>
                                {errors.password && <span className="text-red-600">Password is required</span>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="bg-indigo-500 w-full rounded-md py-3 text-white">
                                {loading ? <ImSpinner10 className="m-auto animate-spin" size={24} /> : "Login"} 
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center pt-4 space-x-1"></div>
                    <p className="px-6 text-sm text-center text-gray-400">
                        Don&apos;t have an account yet?{" "}
                        <Link to="/signup" className="hover:underline hover:text-indigo-500 text-gray-600">
                            Sign up
                        </Link>
                        .
                    </p>
                    <div className="divider">OR</div>
                    <div className="text-center space-x-4">
                        <button className="btn btn-circle btn-outline" onClick={handleGoogleSignIn}>
                            <FcGoogle size={30} />
                        </button>
                        <button className="btn btn-circle btn-outline" onClick={handleGithubSignIn}>
                            <FaGithub size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;