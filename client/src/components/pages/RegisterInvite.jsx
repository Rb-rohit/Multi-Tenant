import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    LockKeyhole,
    ShieldCheck,
    User,
    UserPlus,
    Users,
} from "lucide-react";

const RegisterInvite = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!token) {
            return toast.error("Invalid invitation link");
        }

        if (!form.name.trim()) {
            return toast.error("Please enter your name");
        }

        if (!form.password) {
            return toast.error("Please create a password");
        }

        if (form.password.length < 6) {
            return toast.error(
                "Password must contain at least 6 characters"
            );
        }

        try {
            setLoading(true);

            await API.post("/auth/register-invite", {
                token,
                name: form.name.trim(),
                password: form.password,
            });

            toast.success("Registration completed successfully");

            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err) {
            console.error("Invite registration error:", err);

            toast.error(
                err?.response?.data?.message ||
                    "Invalid or expired invitation"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex">
            {/* Left Branding Panel */}
            <div className="hidden lg:flex lg:w-[46%] bg-[#0B1220] relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#2563EB]/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Users size={23} className="text-white" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-white">
                                MultiTenant
                            </h1>

                            <p className="text-xs text-slate-400 mt-0.5">
                                Enterprise Management
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-lg">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-7">
                            <UserPlus
                                size={27}
                                className="text-blue-400"
                            />
                        </div>

                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                            Employee Onboarding
                        </p>

                        <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mt-3">
                            Welcome to your
                            <span className="block text-blue-400">
                                workspace.
                            </span>
                        </h2>

                        <p className="text-slate-400 text-base leading-7 mt-5 max-w-md">
                            Complete your registration to securely join your
                            organization's MultiTenant workspace.
                        </p>

                        {/* Benefits */}
                        <div className="mt-9 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <CheckCircle2
                                        size={17}
                                        className="text-emerald-400"
                                    />
                                </div>

                                <span className="text-sm text-slate-300">
                                    Secure employee access
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <CheckCircle2
                                        size={17}
                                        className="text-emerald-400"
                                    />
                                </div>

                                <span className="text-sm text-slate-300">
                                    Organization-specific workspace
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <CheckCircle2
                                        size={17}
                                        className="text-emerald-400"
                                    />
                                </div>

                                <span className="text-sm text-slate-300">
                                    Role-based access control
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} MultiTenant. Secure
                        enterprise workspace.
                    </p>
                </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
                            <Users size={21} className="text-white" />
                        </div>

                        <div>
                            <h1 className="font-bold text-lg">
                                MultiTenant
                            </h1>

                            <p className="text-[11px] text-[#64748B]">
                                Enterprise Management
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-[#E2E8F0]">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                                <KeyRound
                                    size={22}
                                    className="text-[#2563EB]"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-[#0F172A]">
                                Complete Registration
                            </h2>

                            <p className="text-sm text-[#64748B] mt-2 leading-6">
                                Set up your account to join the invited
                                workspace.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRegister}>
                            <div className="px-6 sm:px-8 py-7 space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-[#334155] mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={18}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                        />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={loading}
                                            autoComplete="name"
                                            className="w-full h-11 pl-10 pr-4 border border-[#CBD5E1] rounded-lg text-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-[#334155] mb-2"
                                    >
                                        Create Password
                                    </label>

                                    <div className="relative">
                                        <LockKeyhole
                                            size={18}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                        />

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Create a secure password"
                                            value={form.password}
                                            onChange={handleChange}
                                            disabled={loading}
                                            autoComplete="new-password"
                                            className="w-full h-11 pl-10 pr-11 border border-[#CBD5E1] rounded-lg text-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            disabled={loading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition disabled:opacity-50"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs text-[#94A3B8] mt-2">
                                        Password must contain at least 6
                                        characters.
                                    </p>
                                </div>

                                {/* Security Notice */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                                    <ShieldCheck
                                        size={19}
                                        className="text-[#2563EB] mt-0.5 shrink-0"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-[#334155]">
                                            Secure account setup
                                        </p>

                                        <p className="text-xs text-[#64748B] mt-1 leading-5">
                                            Your invitation token is used to
                                            connect this registration with the
                                            invited workspace.
                                        </p>
                                    </div>
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <ArrowRight size={17} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="px-6 sm:px-8 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
                            <p className="text-sm text-[#64748B]">
                                Already have an account?{" "}
                                <Link
                                    to="/"
                                    className="font-semibold text-[#2563EB] hover:text-blue-700 transition"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Security */}
                    <div className="flex items-center justify-center gap-2 mt-5 text-xs text-[#94A3B8]">
                        <ShieldCheck size={14} />
                        Secure enterprise onboarding
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterInvite;