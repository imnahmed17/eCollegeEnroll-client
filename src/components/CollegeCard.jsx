import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const CollegeCard = ({ collegeData }) => {
    return (
        <div className="bg-base-100 rounded-lg overflow-hidden shadow">
            <figure className="overflow-hidden">
                <img className="w-full h-52 object-cover" src={collegeData.collegeImage} alt={collegeData.collegeName} />
            </figure>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{collegeData.collegeName}</h3>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">Admission Date:</span> {collegeData.admissionDate}
                </p>
                <div className='flex items-center gap-1'>
                    <span className="text-gray-700 text-base font-semibold">Rating: </span>
                    <Rating style={{ maxWidth: 100 }} value={collegeData.rating} readOnly />
                </div>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">No. of research:</span> {collegeData.noOfResearch}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">Active events:</span> {collegeData.activeEvents}
                </p>
                <div className="mt-6">
                    <Link to={`/college/${collegeData._id}`}>
                        <button className='btn btn-primary' >View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CollegeCard;