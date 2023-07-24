import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import MyCollegeRow from './MyCollegeRow';
import UpdateModal from './UpdateModal';

const MyCollege = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [singleApplication, setSingleApplication] = useState({});
    const [uniqueId, setUniqueId] = useState(null);

    useEffect(() => {
        axiosSecure(`/applications?email=${user?.email}`)
            .then(res => setApplications(res.data));
        
        if(uniqueId !== null) {
            axiosSecure(`/application/${uniqueId}`)
                .then(res => setSingleApplication(res.data));
        }
    }, [axiosSecure, applications, user?.email, uniqueId]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#F87272",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/application/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your toy has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 900,
                            });
                            const remaining = applications.filter(application => application._id !== id);
                            setApplications(remaining);
                        }
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your toy is safe :)",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 900,
                });
            }
        });
    };

    const handleUpdate = (info, id) => {
        const { cName, canName, rating, phone, dob, review } = info;
        const updatedApplication = { phone, dob };
        const canImage = user.photoURL;
        const collegeReview = { cName, canName, canImage, rating, review };

        axiosSecure.put(`/application/${id}`, updatedApplication)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    axiosSecure.post('/review', collegeReview)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Application Updated Successfully',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                });
                            }
                        });
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | My Colleges</title>
            </Helmet>
            <div className='mt-4 mb-8'>
                <SectionTitle title='My Applications' />
            </div>
            <div className='overflow-x-auto w-full'>
                <table className='table w-full'>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Image</th>
                            <th>College Name</th>
                            <th>Candidate Information</th>
                            <th>Admission Date</th>
                            <th>Subject</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map(application => <MyCollegeRow
                                key={application._id}
                                application={application} 
                                handleDelete={handleDelete}
                                setUniqueId={setUniqueId}
                            />)
                        }
                    </tbody>
                </table>
                <UpdateModal 
                    singleApplication={singleApplication} 
                    handleUpdate={handleUpdate} 
                />
            </div>
        </>
    );
};

export default MyCollege;