import { useState } from "react";
import { Link} from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    User,
    Users,
} from "lucide-react";

const CreateCompany = () => {
    // const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
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

    const handleCreate = async (e) => {
        e.preventDefault();

        if (
            !form.name.trim() ||
            !form.adminName.trim() ||
            !form.adminEmail.trim() ||
            !form.adminPassword.trim()
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);

            await API.post("/company/create", form);

            toast.success("Company created successfully.");

            setForm({
                name: "",
                adminName: "",
                adminEmail: "",
                adminPassword: "",
            });

        } catch (err) {
            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                    "Unable to create company. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A]">
            {/* ================= TOP HEADER ================= */}
            <header className="border-b border-[#E2E8F0] bg-white">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
                    {/* Logo */}
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-sm">
                            <Building2 size={21} />
                        </div>

                        <div>
                            <h1 className="text-[16px] font-bold tracking-wide">
                                MultiTenant
                            </h1>

                            <p className="text-[11px] text-slate-400">
                                Enterprise Platform
                            </p>
                        </div>
                    </Link>

                    {/* Back */}
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={16} />

                        <span className="hidden sm:inline">
                            Back to Dashboard
                        </span>

                        <span className="sm:hidden">Back</span>
                    </Link>
                </div>
            </header>

            {/* ================= CONTENT ================= */}
            <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Link
                            to="/dashboard"
                            className="hover:text-[#2563EB]"
                        >
                            Dashboard
                        </Link>

                        <span>/</span>

                        <span className="text-slate-500">
                            Create Company
                        </span>
                    </div>

                    <div className="mt-3">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Create New Company
                        </h2>

                        <p className="mt-1 max-w-2xl text-sm text-slate-500">
                            Create a new tenant workspace and configure its
                            initial administrator account.
                        </p>
                    </div>
                </div>

                {/* ================= GRID ================= */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_330px]">
                    {/* ================= FORM ================= */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        {/* Form Header */}
                        <div className="border-b border-[#E2E8F0] px-6 py-5 sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                                    <Building2 size={19} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Company Information
                                    </h3>

                                    <p className="text-xs text-slate-400">
                                        Enter the basic company details
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form
                            onSubmit={handleCreate}
                            className="p-6 sm:p-8"
                        >
                            {/* Company Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Company Name
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">
                                    <Building2
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter company name"
                                        className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-3 focus:ring-blue-50"
                                    />
                                </div>
                            </div>

                            {/* Admin Section */}
                            <div className="mt-8 border-t border-[#E2E8F0] pt-8">
                                <div className="mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <User size={19} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                Initial Administrator
                                            </h3>

                                            <p className="text-xs text-slate-400">
                                                Create the first admin account
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Admin Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Admin Name
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="adminName"
                                            value={form.adminName}
                                            onChange={handleChange}
                                            placeholder="Enter administrator name"
                                            className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-3 focus:ring-blue-50"
                                        />
                                    </div>
                                </div>

                                {/* Admin Email */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Admin Email
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="email"
                                            name="adminEmail"
                                            value={form.adminEmail}
                                            onChange={handleChange}
                                            placeholder="admin@company.com"
                                            className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-3 focus:ring-blue-50"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Admin Password
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <LockKeyhole
                                            size={17}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="adminPassword"
                                            value={form.adminPassword}
                                            onChange={handleChange}
                                            placeholder="Create secure password"
                                            className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-3 focus:ring-blue-50"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>

                                    <p className="mt-2 text-xs text-slate-400">
                                        Use a strong password with a
                                        combination of letters, numbers and
                                        symbols.
                                    </p>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E2E8F0] pt-6 sm:flex-row sm:justify-end">
                                <Link
                                    to="/dashboard"
                                    className="flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={17} />
                                            Create Company
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ================= SIDE INFO ================= */}
                    <div className="space-y-5">
                        {/* Access Card */}
                        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0B1220] text-white shadow-sm">
                            <div className="p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                    <ShieldCheck size={21} />
                                </div>

                                <h3 className="mt-5 text-lg font-bold">
                                    Secure Tenant Setup
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Each company operates as an isolated
                                    tenant with role-based access control.
                                </p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 text-blue-400">
                                            <CheckCircle2 size={16} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                Isolated Workspace
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Company-level data separation
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 text-blue-400">
                                            <CheckCircle2 size={16} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                Role Based Access
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Controlled admin permissions
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 text-blue-400">
                                            <CheckCircle2 size={16} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                Centralized Management
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                Manage users and products
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Process Card */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                                    <Users size={19} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        What happens next?
                                    </h3>

                                    <p className="text-xs text-slate-400">
                                        Company creation workflow
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-5">
                                <div className="flex gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#2563EB]">
                                        1
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Company is created
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            A new tenant workspace is
                                            registered.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#2563EB]">
                                        2
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Admin account is created
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            The initial administrator receives
                                            access to the company.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#2563EB]">
                                        3
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Workspace becomes available
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                            Users and products can then be
                                            managed under the tenant.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateCompany;