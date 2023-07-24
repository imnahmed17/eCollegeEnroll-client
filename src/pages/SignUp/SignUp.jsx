import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { saveUser } from '../../api/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loading, createUser, updateUserData, googleSignIn, githubSignIn, logOut } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const saveAddress = localStorage.getItem('address') || '/';
    const from = location.state?.from?.pathname || saveAddress;
    localStorage.setItem('address', from);

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserData(loggedUser, data.name, data.photoURL)
                    .then(() => {
                        saveUser(result.user);
                        toast.success("User Created!");
                        reset();
                        logOut();
                    })
                    .catch((err) => {
                        console.log(err.message);
                        toast.error(err.message);
                    });
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                saveUser(result.user);
                toast.success("Welcome Back!");
                navigate(from, { replace: true });
            })
            .catch((err) => {
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

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Sign Up</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen my-10">
                <div className="flex flex-col w-80 md:w-96 p-6 rounded-md sm:p-10 bg-indigo-50 text-gray-900">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                        <p className="text-sm text-gray-400">Welcome to eCollegeEnroll</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                                <input type="text" {...register("name", { required: true })} name="name" id="name" placeholder="Enter Your Name Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div>
                                <label htmlFor="photoURL" className="block mb-2 text-sm">Photo URL:</label>
                                <input type="text" {...register("photoURL", { required: true })} name="photoURL" id="photoURL" placeholder="Enter Your Photo URL Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                                <input type="email" {...register("email", { required: true })} name="email" id="email" placeholder="Enter Your Email Here" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" data-temp-mail-org="0" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                <input type={show ? "text" : "password"} {...register("password", { 
                                    required: true, 
                                    minLength: 6, 
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ 
                                })} name="password" id="password" placeholder="******" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900" />
                                <Link className="mt-1 flex justify-end label-text-alt hover:underline hover:text-indigo-500 text-gray-600" onClick={() => setShow(!show)}>
                                    {
                                        show ? <span>Hide Password</span>: <span>Show Password</span>
                                    }
                                </Link>
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain one Uppercase and one special character.</p>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="bg-indigo-500 w-full rounded-md py-3 text-white">
                                {loading ? <ImSpinner10 className="m-auto animate-spin" size={24} /> : "Sign Up"} 
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center pt-4 space-x-1"></div>
                    <p className="px-6 text-sm text-center text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="hover:underline hover:text-indigo-500 text-gray-600">
                            Login
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

export default SignUp;