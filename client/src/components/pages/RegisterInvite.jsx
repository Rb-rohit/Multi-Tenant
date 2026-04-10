import React, { useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import API from '../../services/api';
import { toast } from 'react-toastify';

const RegisterInvite = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        password: ""
    });

    const handleRegister = async () => {
        try {
            await API.post("/auth/register-invite", {
            token,
            name: form.name,
            password: form.password
        });

        toast("Registered successfully");
        navigate("/")
        } catch (err) {
            console.log(err);
            toast("Invalid or expired invite");
        }
        
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-md'>

                <h2 className='text-2xl font-bold text-center mb-6'>
                    Complete Registration
                </h2>

                <input 
                    type='password'
                    placeholder='Create Paassword'
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    className='w-full mb-4 px-4 py-2 border rounded-lg'
                />

                <button
                    onClick={handleRegister}
                    className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default RegisterInvite;