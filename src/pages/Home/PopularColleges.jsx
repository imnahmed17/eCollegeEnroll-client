import { useEffect, useRef, useState } from 'react';
import CollegeCard from '../../components/CollegeCard';
import SectionTitle from '../../components/SectionTitle';

const PopularColleges = () => {
    const [colleges, setColleges] = useState([]);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/colleges?search=${search}`)
            .then((res) => res.json())
            .then((data) => setColleges(data));
    }, [search]);

    const handleSearch = () => {
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
    };

    return (
        <div className="mt-4">
            <SectionTitle title='Popular Colleges' />
            <div className='flex justify-center my-6'>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" ref={searchRef} placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    colleges.slice(0, 3).map(collegeData => <CollegeCard 
                        key={collegeData._id} 
                        collegeData={collegeData} 
                    />)
                }
            </div>
        </div>
    );
};

export default PopularColleges;