import React, { useState } from 'react'
import { toast } from "react-toastify";
import API from '../../services/api';

const CreateProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: ""
    });

    const handleSubmit = async () => {
        if (!form.name || !form.price) {
            return toast("All fields are required");
        }

        try {
            await API.post("/products", form);

            toast("Product created successfully");

            setForm({ name: "", price: ""});
        } catch (err) {
            console.log(err);
            toast("Error creating product");
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-2xl shadow w-full max-w-md'>

                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Create Product
                </h2>

                <input 
                    type='text'
                    placeholder='Product Name'
                    value={form.name}
                    onChange={(e) => 
                        setForm({...form, name: e.target.value})
                    }
                    className='w-full mb-4 py-2 rounded-lg'
                />

                <input 
                    type='number'
                    placeholder='Product Price'
                    value={form.price}
                    onChange={(e) => 
                        setForm({...form, price: e.target.value})
                    }
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                />

                <button
                    onClick={handleSubmit}
                    className='w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition'
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default CreateProduct;