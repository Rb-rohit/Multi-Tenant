import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Eye,
    EyeOff,
    LayoutDashboard,
    LockKeyhole,
    ShieldCheck,
    Users,
} from "lucide-react";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("auth/login", form);

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful");

            navigate("/dashboard");
        } catch (err) {
            console.log("Error while login", err);

            toast.error(
                err?.response?.data?.message ||
                    "Invalid Credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fb] flex">

            {/* =====================================================
                LEFT BRAND PANEL
            ====================================================== */}

            <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#0b1220]">

                {/* Background decoration */}

                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl" />

                <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

                <div className="absolute inset-0 opacity-[0.035]">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                            backgroundSize: "45px 45px",
                        }}
                    />
                </div>

                <div className="relative z-10 w-full flex flex-col justify-between p-10 xl:p-14">

                    {/* Logo */}

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-900/30">
                            <LayoutDashboard
                                size={21}
                                className="text-white"
                            />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight">
                                MultiTenant
                            </h1>

                            <p className="text-[9px] text-slate-500 tracking-[0.2em] font-medium">
                                MANAGEMENT SYSTEM
                            </p>
                        </div>
                    </div>

                    {/* Main content */}

                    <div className="max-w-xl">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.05] mb-6">

                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                            <span className="text-[10px] font-medium text-slate-300">
                                Enterprise workspace
                            </span>
                        </div>

                        <h2 className="text-4xl xl:text-5xl font-bold leading-[1.12] tracking-tight text-white">
                            One workspace.
                            <br />

                            <span className="text-blue-500">
                                Multiple businesses.
                            </span>
                        </h2>

                        <p className="mt-6 text-sm leading-7 text-slate-400 max-w-lg">
                            Manage companies, users and products
                            from one secure multi-tenant platform
                            designed for modern teams.
                        </p>

                        {/* Features */}

                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-3">

                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                    <ShieldCheck
                                        size={16}
                                        className="text-blue-400"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-200">
                                        Role-based access
                                    </p>

                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        Secure permissions for every user
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">

                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                    <Building2
                                        size={16}
                                        className="text-blue-400"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-200">
                                        Multi-company management
                                    </p>

                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        Manage multiple tenants from one place
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">

                                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                    <Users
                                        size={16}
                                        className="text-blue-400"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-200">
                                        Centralized workspace
                                    </p>

                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        Teams, products and data in one system
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}

                    <div className="flex items-center justify-between">

                        <p className="text-[10px] text-slate-600">
                            © {new Date().getFullYear()} MultiTenant
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-slate-600">
                            <LockKeyhole size={12} />
                            Secure Login
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                RIGHT LOGIN PANEL
            ====================================================== */}

            <div className="w-full lg:w-[48%] flex items-center justify-center px-5 sm:px-8 py-10">

                <div className="w-full max-w-[420px]">

                    {/* Mobile Logo */}

                    <div className="flex lg:hidden items-center justify-center gap-3 mb-10">

                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <LayoutDashboard
                                size={19}
                                className="text-white"
                            />
                        </div>

                        <div>
                            <h1 className="text-base font-bold text-slate-900">
                                MultiTenant
                            </h1>

                            <p className="text-[8px] text-slate-400 tracking-[0.18em]">
                                MANAGEMENT SYSTEM
                            </p>
                        </div>
                    </div>

                    {/* Login Header */}

                    <div className="mb-8">

                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-5">

                            <LockKeyhole
                                size={20}
                                className="text-blue-600"
                            />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to access your workspace.
                        </p>
                    </div>

                    {/* Login Card */}

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/40 p-6 sm:p-7">

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="block text-[11px] font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>

                            {/* Password */}

                            <div>

                                <div className="flex items-center justify-between mb-2">

                                    <label className="text-[11px] font-semibold text-slate-700">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-[10px] font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        className="w-full h-11 px-4 pr-11 rounded-lg border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember */}

                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />

                                    <span className="text-[10px] text-slate-500">
                                        Keep me signed in
                                    </span>
                                </label>
                            </div>

                            {/* Login */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in

                                        <ArrowRight
                                            size={15}
                                            className="group-hover:translate-x-0.5 transition-transform"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security */}

                        <div className="mt-6 pt-5 border-t border-slate-100">

                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={14}
                                    className="text-emerald-500"
                                />

                                <p className="text-[10px] text-slate-400">
                                    Your connection is secure and protected
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}

                    <div className="mt-6 text-center">

                        <p className="text-[10px] text-slate-400">
                            MultiTenant Management System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;