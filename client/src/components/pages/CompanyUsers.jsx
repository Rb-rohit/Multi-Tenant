import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../../services/api";
import {
    AlertCircle,
    ArrowLeft,
    Building2,
    ChevronRight,
    Mail,
    Plus,
    RefreshCw,
    Search,
    ShieldCheck,
    User,
    UserCog,
    Users,
} from "lucide-react";

const CompanyUsers = () => {
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await API.get(
                `/company/comp-users?companyId=${id}`
            );

            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                    "Unable to load company users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUsers();
        }
    }, [id]);

    const filteredUsers = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return users;

        return users.filter((user) => {
            const name = user.name?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
            const role = user.role?.toLowerCase() || "";

            return (
                name.includes(query) ||
                email.includes(query) ||
                role.includes(query)
            );
        });
    }, [users, search]);

    const roleCounts = useMemo(() => {
        return {
            superadmin: users.filter(
                (user) => user.role?.toLowerCase() === "superadmin"
            ).length,

            admin: users.filter(
                (user) => user.role?.toLowerCase() === "admin"
            ).length,

            employee: users.filter(
                (user) => user.role?.toLowerCase() === "employee"
            ).length,
        };
    }, [users]);

    const getRoleStyle = (role) => {
        switch (role?.toLowerCase()) {
            case "superadmin":
                return {
                    badge: "bg-purple-50 text-purple-700",
                    icon: "text-purple-600",
                    label: "Super Admin",
                };

            case "admin":
                return {
                    badge: "bg-blue-50 text-blue-700",
                    icon: "text-blue-600",
                    label: "Admin",
                };

            case "employee":
                return {
                    badge: "bg-emerald-50 text-emerald-700",
                    icon: "text-emerald-600",
                    label: "Employee",
                };

            default:
                return {
                    badge: "bg-slate-100 text-slate-600",
                    icon: "text-slate-500",
                    label: role || "User",
                };
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A]">
            {/* ================= SIDEBAR ================= */}
            <aside className="fixed left-0 top-0 hidden h-screen w-[250px] bg-[#0B1220] text-white lg:flex lg:flex-col">
                {/* Logo */}
                <div className="flex h-[76px] items-center border-b border-white/10 px-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]">
                        <Building2 size={21} />
                    </div>

                    <div className="ml-3">
                        <h1 className="text-[16px] font-bold tracking-wide">
                            MultiTenant
                        </h1>

                        <p className="text-[11px] text-slate-400">
                            Enterprise Platform
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        Workspace
                    </p>

                    <Link
                        to="/dashboard"
                        className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Building2 size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/all-products"
                        className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Users size={18} />
                        Products
                    </Link>

                    <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        Management
                    </p>

                    <div className="flex items-center gap-3 rounded-xl bg-[#2563EB] px-3 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30">
                        <Users size={18} />
                        Company Users
                    </div>

                    <Link
                        to="/invite"
                        className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Mail size={18} />
                        Invite User
                    </Link>
                </nav>

                {/* Bottom */}
                <div className="border-t border-white/10 p-4">
                    <div className="rounded-xl bg-white/5 p-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <ShieldCheck size={17} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white">
                                    Access Control
                                </p>

                                <p className="text-[10px] text-slate-500">
                                    RBAC protected
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ================= MAIN ================= */}
            <main className="lg:ml-[250px]">
                {/* Header */}
                <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
                    <div className="flex min-h-[76px] items-center justify-between gap-4 px-5 sm:px-8">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Link
                                    to="/dashboard"
                                    className="hover:text-[#2563EB]"
                                >
                                    Dashboard
                                </Link>

                                <ChevronRight size={13} />

                                <span className="text-slate-500">
                                    Company Users
                                </span>
                            </div>

                            <h1 className="mt-1 truncate text-xl font-bold tracking-tight">
                                Company Users
                            </h1>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                onClick={fetchUsers}
                                disabled={loading}
                                className="flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={loading ? "animate-spin" : ""}
                                />

                                <span className="hidden sm:inline">
                                    Refresh
                                </span>
                            </button>

                            <Link
                                to="/invite"
                                className="flex h-10 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                            >
                                <Plus size={17} />

                                <span className="hidden sm:inline">
                                    Invite User
                                </span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ================= CONTENT ================= */}
                <section className="p-5 sm:p-8">
                    {/* Back */}
                    <Link
                        to="/dashboard"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#2563EB]"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    {/* ================= COMPANY HERO ================= */}
                    <div className="mb-7 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        <div className="relative overflow-hidden bg-[#0B1220] px-6 py-7 sm:px-8">
                            {/* Grid background */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                                    backgroundSize: "32px 32px",
                                }}
                            />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg shadow-blue-950/40">
                                        <Users size={27} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-300">
                                            Tenant Access Management
                                        </p>

                                        <h2 className="text-xl font-bold text-white sm:text-2xl">
                                            Company Users
                                        </h2>

                                        <p className="mt-1 break-all font-mono text-xs text-slate-400">
                                            Company ID: {id}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                                    <ShieldCheck size={14} />
                                    RBAC Enabled
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Workspace
                                </p>

                                <p className="mt-1 font-mono text-sm text-slate-600">
                                    {id}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Users size={16} />

                                <span>
                                    {loading
                                        ? "Loading users..."
                                        : `${users.length} user${
                                              users.length !== 1 ? "s" : ""
                                          } in this company`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ================= STATS ================= */}
                    <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {/* Total */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Users
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold">
                                        {loading ? "—" : users.length}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                                    <Users size={19} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Company members
                            </p>
                        </div>

                        {/* Admin */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Admins
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold">
                                        {loading ? "—" : roleCounts.admin}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <UserCog size={19} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Administrative access
                            </p>
                        </div>

                        {/* Employees */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Employees
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold">
                                        {loading ? "—" : roleCounts.employee}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <User size={19} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Standard access
                            </p>
                        </div>

                        {/* Superadmin */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Super Admins
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold">
                                        {loading
                                            ? "—"
                                            : roleCounts.superadmin}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                    <ShieldCheck size={19} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Full platform access
                            </p>
                        </div>
                    </div>

                    {/* ================= USER TABLE ================= */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        {/* Toolbar */}
                        <div className="flex flex-col gap-4 border-b border-[#E2E8F0] p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-semibold">
                                    User Directory
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Manage members and access roles for this
                                    company
                                </p>
                            </div>

                            <div className="relative w-full sm:w-[310px]">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search name, email or role..."
                                    className="h-10 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-3 focus:ring-blue-50"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="m-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                <AlertCircle size={18} />

                                <span>{error}</span>

                                <button
                                    onClick={fetchUsers}
                                    className="ml-auto font-semibold hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Loading */}
                        {loading ? (
                            <div className="space-y-3 p-5">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[76px] animate-pulse rounded-xl bg-slate-100"
                                    />
                                ))}
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            /* Empty */
                            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <Users size={28} />
                                </div>

                                <h3 className="mt-5 text-base font-semibold">
                                    {search
                                        ? "No matching users"
                                        : "No company users found"}
                                </h3>

                                <p className="mt-1 max-w-sm text-sm text-slate-400">
                                    {search
                                        ? "Try searching with a different name, email or role."
                                        : "Invite users to this company to start managing access."}
                                </p>

                                {!search && (
                                    <Link
                                        to="/invite"
                                        className="mt-5 flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        <Plus size={16} />
                                        Invite User
                                    </Link>
                                )}
                            </div>
                        ) : (
                            /* Table */
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px]">
                                    <thead>
                                        <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-left">
                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                User
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Role
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Access
                                            </th>

                                            <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                User ID
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#E2E8F0]">
                                        {filteredUsers.map((user) => {
                                            const roleStyle = getRoleStyle(
                                                user.role
                                            );

                                            return (
                                                <tr
                                                    key={user._id}
                                                    className="transition hover:bg-[#F8FAFC]"
                                                >
                                                    {/* User */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-[#2563EB]">
                                                                {user.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                    "U"}
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-semibold text-[#0F172A]">
                                                                    {user.name ||
                                                                        "Unnamed User"}
                                                                </p>

                                                                <p className="mt-0.5 text-xs text-slate-400">
                                                                    Company
                                                                    Member
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Mail
                                                                size={15}
                                                                className="text-slate-400"
                                                            />

                                                            <span className="text-sm text-slate-600">
                                                                {user.email ||
                                                                    "—"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Role */}
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${roleStyle.badge}`}
                                                        >
                                                            {roleStyle.label}
                                                        </span>
                                                    </td>

                                                    {/* Access */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck
                                                                size={16}
                                                                className={
                                                                    roleStyle.icon
                                                                }
                                                            />

                                                            <span className="text-xs font-medium text-slate-500">
                                                                Role based
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* ID */}
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="font-mono text-xs text-slate-400">
                                                            {user._id
                                                                ? user._id.slice(
                                                                      -8
                                                                  )
                                                                : "—"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!loading && users.length > 0 && (
                        <div className="mt-5 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                Showing {filteredUsers.length} of{" "}
                                {users.length} users
                            </p>

                            <p className="font-mono">
                                Company: {id}
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default CompanyUsers;