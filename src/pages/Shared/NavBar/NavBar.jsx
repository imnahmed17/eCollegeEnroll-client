import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../../../providers/AuthProvider';
import './NavBar.css';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(err => console.log(err));
    };

    return (
        <div className='navbar bg-base-100 px-4 py-6 '>
            <div className='relative w-full flex items-center justify-between'>
                {/* Logo Section */}
                <Link to='/' className='inline-flex items-center text-3xl lg:text-4xl font-medium tracking-wide italic'>
                    <span className='text-blue-900'>eCollege</span>
                    <span className='text-green-500'>Enroll</span>
                </Link>
                {/* Nav Items Section */}
                <ul className='items-center hidden space-x-8 lg:flex'>
                    <li>
                        <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'default')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/colleges' className={({ isActive }) => (isActive ? 'active' : 'default')}>
                            Colleges
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admission' className={({ isActive }) => (isActive ? 'active' : 'default')}>
                            Admission
                        </NavLink>
                    </li>
                    {
                        user && <>
                            <li>
                                <NavLink to='/my-college' className={({ isActive }) => (isActive ? 'active' : 'default')}>
                                    My College
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active' : 'default')}>
                                    {user.displayName}
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
                {/* Mobile Navbar Section */}
                <div className='lg:hidden'>
                        {/* Dropdown Open Button */}
                        <button aria-label='Open Menu' title='Open Menu' onClick={() => setIsMenuOpen(true)}>
                            <Bars3BottomRightIcon className='w-5 text-gray-600' />
                        </button>
                        {
                            isMenuOpen && (
                                <div className='absolute top-0 left-0 w-full z-10'>
                                    <div className='p-5 bg-white border rounded shadow-sm'>
                                        {/* Logo & Button section */}
                                        <div className='flex items-center justify-between mb-4'>
                                            <div>
                                                <Link to='/' className='inline-flex items-center text-2xl font-semibold tracking-wide italic'>
                                                    <span className='text-blue-900'>
                                                        eCollege
                                                    </span>
                                                    <span className='text-green-500'>
                                                        Enroll
                                                    </span>
                                                </Link>
                                            </div>
                                            {/* Dropdown menu close button */}
                                            <div>
                                                <button aria-label='Close Menu' title='Close Menu' onClick={() => setIsMenuOpen(false)}>
                                                    <XMarkIcon className='w-5 text-gray-600' />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Mobile Nav Items Section */}
                                        <nav>
                                            <ul className='space-y-4'>
                                                <li>
                                                    <NavLink 
                                                        to='/' 
                                                        className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                    >
                                                        Home
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to='/colleges' 
                                                        className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                    >
                                                        Colleges
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink 
                                                        to='/admission' 
                                                        className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                    >
                                                        Admission
                                                    </NavLink>
                                                </li>
                                                {
                                                    user ? <>
                                                        <li>
                                                            <NavLink
                                                                to='/my-college'
                                                                className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                            >
                                                                My College
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to='/profile'
                                                                className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                            >
                                                                {user.displayName}
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <Link onClick={handleLogOut} className='default'>Logout</Link>
                                                        </li>
                                                    </>
                                                    : <li>
                                                        <NavLink 
                                                            to="/login" 
                                                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                        >
                                                            Login
                                                        </NavLink>
                                                    </li>
                                                }
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                {/* Button Section */}
                <div className='hidden lg:block'>
                    {
                        user ? <>
                            <Link onClick={handleLogOut} className='btn'>Logout</Link>
                        </>
                        : <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : 'default')}>
                            Login
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;