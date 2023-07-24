const UpdateModal = ({ singleApplication, handleUpdate }) => {
    const { _id, cName, canName, phone, dob } = singleApplication;

    const handleOnSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const canName = form.canName.value;
        const rating = parseFloat(form.rating.value);
        const phone = form.phone.value;
        const dob = form.dob.value;
        const review = form.review.value;
        const updatedApplication = { cName, canName, rating, phone, dob, review };
        console.log(updatedApplication);
        handleUpdate(updatedApplication, _id);
    };

    return (
        <>
            <input type='checkbox' id='my-modal-3' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box relative'>
                    <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>✕</label>
                    <h3 className='mt-3 text-lg font-bold'>College Name: {cName}</h3>
                    <form onSubmit={handleOnSubmit}>
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Candidate Name</span>
                                </label>
                                <input type="text" name="canName" defaultValue={canName} className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input type="text" placeholder="4.5" name="rating" className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Phone No.</span>
                                </label>
                                <input type="text" name="phone" defaultValue={phone} className="input input-bordered" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Date of Birth</span>
                                </label>
                                <input type="text" name="dob" defaultValue={dob} className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Review</span>
                            </label>
                            <textarea name="review" placeholder="add some comments" className="textarea textarea-bordered h-24" required></textarea>
                        </div>
                        <div className="form-control mt-5">
                            <input className="btn btn-primary" type="submit" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateModal;