
import { useState } from 'react';
import { useParams } from "react-router-dom";
import API from '../../services/api';
import { useEffect } from 'react';

const CompanyUsers = () => {
    const {id} = useParams();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await API.get(`/company/comp-users?companyId=${id}`);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Company Users</h2>

            <div className='bg-white p-4 rounded shadow'>
                {users.map((user) => (
                    <div key={user._id} className='border-b py-2'>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b>{user.email}</p>
                        <p><b>Role:</b>{user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyUsers;