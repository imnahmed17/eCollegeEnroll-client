import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle';
import CollegeCard from '../../components/CollegeCard';

const Colleges = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/colleges`)
            .then((res) => res.json())
            .then((data) => setColleges(data));
    }, []);

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Colleges</title>
            </Helmet>
            <div className="mt-4">
                <SectionTitle title='All Colleges' />
                <div className="px-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        colleges.map(collegeData => <CollegeCard 
                            key={collegeData._id} 
                            collegeData={collegeData} 
                        />)
                    }
                </div>
            </div>
        </>
    );
};

export default Colleges;