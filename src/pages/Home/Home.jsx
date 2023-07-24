// import React from 'react';
import { Helmet } from 'react-helmet-async';
import PopularColleges from './PopularColleges';
import PhotoGallery from './PhotoGallery';
import './Home.css'

const Home = () => {
    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Home</title>
            </Helmet>
            <PopularColleges />
            <PhotoGallery />
        </>
    );
};

export default Home;