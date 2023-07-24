const MyCollegeRow = ({ application, handleDelete, setUniqueId }) => {
    const { _id, image, cName, canName, canEmail, phone, dob, address, aDate, subject } = application;

    return (
        <tr className='hover'>
            <th>
                <button onClick={() => handleDelete(_id)} className='btn btn-sm btn-circle'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
                </button>
            </th>
            <td>
                <div className='avatar'>
                    <div className='rounded w-20 h-20'>
                        {image && <img src={image} alt='' />}
                    </div>
                </div>
            </td>
            <td>{cName}</td>
            <td>
                {canName} <br />
                {canEmail} <br />
                {phone} <br />
                {dob} <br />
                {`${address.length > 30}` ? `${address.substring(0, 30)}...` : `${address}`}
            </td>
            <td>{aDate}</td>
            <td>{subject}</td>
            <td>
                <label htmlFor='my-modal-3' onClick={() => setUniqueId(_id)} className='btn btn-sm btn-active btn-ghost normal-case'>Wanna Change?</label>
            </td>
        </tr>
    );
};

export default MyCollegeRow;