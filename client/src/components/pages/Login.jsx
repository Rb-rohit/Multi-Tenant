import { useState } from 'react'
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("auth/login", form);

            localStorage.setItem("token", res.data.token);
            toast("Login Successful");
            navigate("/dashboard");
        } catch (err) {
            toast("Invalid Credentials");
            console.log("Error while login", err);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>

            </div>
        </div>
    );
};

export default Login;