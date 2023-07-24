import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import SectionTitle from '../../components/SectionTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const TakeAdmission = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth(); 
    const college = useLoaderData();
    const { collegeName, admissionDate } = college;
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { cName, aDate, canName, canEmail, subject, phone, dob, address } = data;
                    const newApplication = { cName, aDate, canName, canEmail, subject, phone, dob, address, image:imgURL };
                    console.log(newApplication);
                    axiosSecure.post('/applications', newApplication)
                        .then(data => {
                            console.log('after posting new application', data.data);
                            if (data.data.insertedId) {
                                reset();
                                toast.success('Your application is added to the database');
                                navigate('/my-college');
                            }
                        });
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>eCollegeEnroll | Admission</title>
            </Helmet>
            <div className='my-4'>
                <SectionTitle title='College Admission Application' />
            </div>
            <div className='px-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">College Name*</span>
                            </label>
                            <input type="text" placeholder="College Name" defaultValue={collegeName} {...register("cName", { required: true, maxLength: 120 })} className="input input-bordered w-full" readOnly />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Admission Date*</span>
                            </label>
                            <input type="text" placeholder="dd mm, yyyy" defaultValue={admissionDate} {...register("aDate", { required: true })} className="input input-bordered w-full" readOnly />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 my-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Candidate Name*</span>
                            </label>
                            <input type="text" placeholder="Candidate Name" defaultValue={user.displayName} {...register("canName", { required: true, maxLength: 120 })} className="input input-bordered w-full" readOnly />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Candidate Email*</span>
                            </label>
                            <input type="email" placeholder="abc@gmail.com" defaultValue={user.email} {...register("canEmail", { required: true })} className="input input-bordered w-full" readOnly />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 my-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Subject*</span>
                            </label>
                            <select defaultValue="Pick One" {...register("subject", { required: true })} className="select select-bordered">
                                <option disabled>Pick One</option>
                                <option>Science</option>
                                <option>Business Studies</option>
                                <option>Humanities</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Phone No.*</span>
                            </label>
                            <input type="text" placeholder="01XXX-XXXXXX" {...register("phone", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Date of Birth*</span>
                            </label>
                            <input type="text" placeholder="dd mm, yyyy" {...register("dob", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Address*</span>
                        </label>
                        <textarea placeholder="A/B street, city" {...register("address", { required: true })} className="textarea textarea-bordered h-24" />
                    </div>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text font-semibold">Candidate Image*</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
                    </div>
                    <input className="btn btn-primary mt-4 w-1/2" type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
};

export default TakeAdmission;