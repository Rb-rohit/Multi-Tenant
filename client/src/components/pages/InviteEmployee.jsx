import React, { useState } from 'react'
import API from '../../services/api';
import { toast } from 'react-toastify';

const InviteEmployee = () => {
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");

    const handleInvite = async () => {
        if (!email) {
            return toast("Please enter email");
        }

        try {
            const res = await API.post("/invite", {email});
            setLink(res.data.inviteLink);

            toast("Invite sent successfully");
        } catch (err) {
            console.log(err);
            toast("Error sending invite");
        }
    };

    const copyToClicpboard = () => {
        navigator.clipboard.writeText(link);
        toast("Link copied!");
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-md'>

                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Invite Employee
                </h2>
                
                <input 
                    type='email'
                    placeholder='Enter Employee Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
                />

                <button
                    onClick={handleInvite}
                    className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition'
                >
                    Send Invite
                </button>

                {/* invite link */}
                {link && (
                    <div className='mt-6 p-4 bg-gray-50 rounded-lg border'>
                        <p className='text-sm text-gray-600 mb-2'>Invite Link:</p>

                        <div className='flex items-center gap-2'>
                            <input 
                                value={link}
                                readOnly
                                className='flex-1 px-2 py-1 border rounded text-sm'
                            />

                            <button
                                onClick={copyToClicpboard}
                                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InviteEmployee;