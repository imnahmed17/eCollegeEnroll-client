import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SectionTitle from '../../components/SectionTitle';

const CollegeDetails = () => {
    const college = useLoaderData();
    const { collegeName, collegeImage, description, established, eiin, address, rating, admissionDate, papers, events } = college;

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | {collegeName} </title>
            </Helmet>
            <div className="hero min-h-[calc(100vh-306px)]" style={{backgroundImage: `url(${collegeImage})`}}>
                <div className="hero-overlay bg-opacity-60"></div>
            </div>
            <div className='my-2'>
                <SectionTitle title={collegeName} />
            </div>
            <div>
                <p className='my-6 text-justify'>{description}</p>
                <p><span className='font-semibold'>Established:</span> {established}</p>
                <p><span className='font-semibold'>EIIN:</span> {eiin}</p>
                <p><span className='font-semibold'>Address:</span> {address}</p>
                <p><span className='font-semibold'>Admission Date:</span> {admissionDate}</p>
                <div className='flex items-center gap-1'>
                    <span className="font-semibold">Rating: </span>
                    <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
                </div>
                <p><span className='font-semibold'>No. of Research:</span> {papers.length}</p>
                <p><span className='font-semibold'>Active Events:</span> {events.length}</p>
            </div>
            <div className='my-6'>
                <SectionTitle title='Admission Process' />
            </div>
            <div>
                <h3 className='text-xl font-semibold font-serif'>Application Eligibility</h3>
                <li className='ml-6'>Department of Science (Bangla Version); Application Eligibility: (GPA 5.00 with Higher Mathematics)</li>
                <li className='ml-6'>Department of Science (English Version); Application Eligibility: (GPA 5.00 with Higher Mathematics)</li>
                <li className='ml-6'>Business Studies (Bangla Version); Application Eligibility: (GPA 4.00)</li>
                <li className='ml-6'>Department of Humanities: (Bangla Version); Application Eligibility: (GPA 3.00)</li>
                <li className='ml-6 font-bold'>In case of a change of department:</li>
                <p className='ml-11'>Bengali medium students cannot apply for English medium. And in case of a change of department from science to business Studies, your GPA should be 4.50 in secondary, and in the case of a change of department from science or business Studies to humanities, if you get GPA of 3.50 in secondary, you will get a chance to apply.</p>
            </div>
            <div className='my-6'>
                <SectionTitle title='Research Papers' />
            </div>
            <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
                {
                    papers.map((paper, index) => <div key={index} className="bg-base-100 rounded-lg shadow">
                        <div className='px-6 py-4'>
                            <h3 className='text-lg font-medium text-justify'>{paper.title}</h3>
                            <div className="mt-3">
                                <a href={paper.link} className="text-indigo-500 font-semibold hover:text-indigo-600" target='blank'>
                                    Learn more &rarr;
                                </a>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className='my-6'>
                <SectionTitle title='Upcoming Events' />
            </div>
            <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
                {
                    events.map((event, index) => <div key={index} className="bg-base-100 rounded-lg overflow-hidden shadow group">
                        <figure className="overflow-hidden">
                            <img className="w-full h-52 object-cover group-hover:scale-125 transition" src={event.image} alt={event.title} />
                        </figure>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                            <p className="text-gray-700 text-base mb-4">{event.date}</p>
                            <p className="text-gray-700 text-base">{event.location}</p>
                            <div className="mt-6">
                                <a href="" className="text-indigo-500 font-semibold hover:text-indigo-600">
                                    Learn more &rarr;
                                </a>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default CollegeDetails;