import { useState } from 'react';
import API from '../../services/api';
import { toast } from 'react-toastify';

const CreateCompany = () => {
    const [form, setForm] = useState({
        name: "",
        adminName: "",
        adminEmail: "",
        adminPassword: ""
    });

    const handleCreate = async () => {
        await API.post("/company/create", form);
        toast("Company created")
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Create Company</h2>

        <input className="w-full p-2 border rounded mb-2" placeholder="Company Name"
          onChange={e => setForm({...form, name: e.target.value})} />

        <input className="w-full p-2 border rounded mb-2" placeholder="Admin Name"
          onChange={e => setForm({...form, adminName: e.target.value})} />

        <input className="w-full p-2 border rounded mb-2" placeholder="Admin Email"
          onChange={e => setForm({...form, adminEmail: e.target.value})} />

        <input className="w-full p-2 border rounded mb-4" placeholder="Password"
          onChange={e => setForm({...form, adminPassword: e.target.value})} />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
    );
};

export default CreateCompany;