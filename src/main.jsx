import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Colleges from './pages/Colleges/Colleges.jsx';
import CollegeDetails from './pages/CollegeDetails/CollegeDetails.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Admission from './pages/Admission/Admission.jsx';
import TakeAdmission from './pages/TakeAdmission/TakeAdmission.jsx';
import MyCollege from './pages/MyCollege/MyCollege.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'colleges',
        element: <Colleges />
      },
      {
        path: 'college/:id',
        element: <PrivateRoute><CollegeDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/college/${params.id}`)
      },
      {
        path: 'admission',
        element: <Admission />
      },
      {
        path: 'collegeAdmission/:id',
        element: <PrivateRoute><TakeAdmission /></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/college/${params.id}`)
      },
      {
        path: 'my-college',
        element: <PrivateRoute><MyCollege /></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup', 
        element: <SignUp />
    }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);