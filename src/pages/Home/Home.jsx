import { Helmet } from 'react-helmet-async';
import PopularColleges from './PopularColleges';
import PhotoGallery from './PhotoGallery';
import Review from './Review';
import './Home.css'

const Home = () => {
    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Home</title>
            </Helmet>
            <PopularColleges />
            <PhotoGallery />
            <Review />
        </>
    );
};

export default Home;