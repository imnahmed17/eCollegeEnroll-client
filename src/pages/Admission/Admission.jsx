import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle';
import { Link } from 'react-router-dom';

const Admission = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/colleges`)
            .then((res) => res.json())
            .then((data) => setColleges(data));
    }, []);

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Admission</title>
            </Helmet>
            <div className='my-4'>
                <SectionTitle title='All Colleges' />
            </div>
            <div className="mt-10 px-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-8 lg:grid-cols-3">
                {
                    colleges.map((college) => <Link to={`/collegeAdmission/${college._id}`} key={college._id}>
                        <div className='bg-base-100 rounded-lg shadow'>
                            <div className='px-6 py-4'>
                                <h3 className='text-lg font-medium text-justify'>{college.collegeName}</h3>
                            </div>
                        </div>
                    </Link>)
                }
            </div>
        </>
    );
};

export default Admission;