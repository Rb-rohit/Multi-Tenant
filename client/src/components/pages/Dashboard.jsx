
import {jwtDecode} from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import API from "../../services/api";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);

            // superadmin fetch all companies
            if (decoded.role === "superadmin") {
                API.get("/company")
                    .then(res => setCompanies(res.data))
                    .catch(err => console.log(err));
            }
        } catch (err) {
            console.log("Invalid token", err);
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }, []);

    if (!user) return <div>Loding...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">

                <h1 className="text-2xl font-bold mb-4">
                    Welcome, {user.role.toUpperCase()}
                </h1>

                <p className="text-gray-600">
                    Company ID: {user.companyId || "Super Admin"}
                </p>

                <div className="mt-6 space-y-3">

                    {user.role ===  "superadmin" && (
                        <>
                            <a href="/create-company" className="block text-blue-600">
                                Create Company
                            </a>

                            <a href="/all-produtcs" className="block text-purple-600">
                                View All Products
                            </a>
                        </>
                    )}

                    {user.role === "admin" && (
                        <a href="/invite" className="block text-green-600">
                            Invite Employee
                        </a>
                    )}

                    {user.role == "employee" && (
                        <a href="/cerate-product" className="block text-purple-600">
                            Add Products
                        </a>
                    )}

                    <a href="/products" className="block text-purple-600">
                        View Products
                    </a>
                    
                </div>
            </div>

            {/* superadmin section  */}
            {user.role === "superadmin" && (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">All companies</h2>

                    {companies.length === 0 ? (
                        <p>No companies found</p>
                    ) : (
                        companies.map(c => (
                            <div 
                                key={c._id}
                                className="p-3 border rounded-lg mb-2 flex justify-between"
                            >
                                <span>{c.name}</span>

                                <div className="flex gap-5">
                                    <a href={`/company/${c._id}/comp-users`} className="text-blue-500 border border-black rounded px-4 py-2">
                                    View Users
                                </a>
                                <a href={`/company/${c._id}`} className="text-blue-500 border  border-black rounded px-4 py-2">
                                    View Data
                                </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;