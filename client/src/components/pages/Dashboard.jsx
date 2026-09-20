import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import {
    Activity,
    ArrowUpRight,
    BarChart3,
    Bell,
    Building2,
    ChevronRight,
    Eye,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Plus,
    Search,
    Settings,
    ShieldCheck,
    UserPlus,
    Users,
    X,
} from "lucide-react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const [companySearch, setCompanySearch] = useState("");

    const navigate = useNavigate();

    /* ============================================================
       AUTH + COMPANY DATA
    ============================================================ */

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const decoded = jwtDecode(token);

            setUser(decoded);

            if (decoded.role === "superadmin") {
                setLoadingCompanies(true);

                API.get("/company")
                    .then((res) => {
                        const data = Array.isArray(res.data)
                            ? res.data
                            : res.data?.companies || [];

                        setCompanies(data);
                    })
                    .catch((error) => {
                        console.error(
                            "Failed to fetch companies:",
                            error
                        );

                        setCompanies([]);
                    })
                    .finally(() => {
                        setLoadingCompanies(false);
                    });
            }
        } catch (error) {
            console.error("Invalid token:", error);

            localStorage.removeItem("token");
            navigate("/");
        }
    }, [navigate]);

    /* ============================================================
       LOGOUT
    ============================================================ */

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    /* ============================================================
       FILTER COMPANIES
    ============================================================ */

    const filteredCompanies = useMemo(() => {
        if (!companySearch.trim()) {
            return companies;
        }

        const search = companySearch.toLowerCase();

        return companies.filter((company) =>
            company.name?.toLowerCase().includes(search)
        );
    }, [companies, companySearch]);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    /* ============================================================
       USER
    ============================================================ */

    const isSuperAdmin = user.role === "superadmin";
    const isAdmin = user.role === "admin";
    const isEmployee = user.role === "employee";

    const displayName =
        user.name ||
        user.username ||
        user.email?.split("@")[0] ||
        "User";

    const initials = displayName.charAt(0).toUpperCase();

    const roleName = isSuperAdmin
        ? "Super Admin"
        : isAdmin
        ? "Administrator"
        : "Employee";

    const RoleIcon = isSuperAdmin
        ? ShieldCheck
        : isAdmin
        ? ShieldCheck
        : Users;

    return (
        <div className="min-h-screen bg-[#f5f7fb]">

            {/* ========================================================
                MOBILE OVERLAY
            ======================================================== */}

            {mobileSidebar && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileSidebar(false)}
                />
            )}

            {/* ========================================================
                SIDEBAR
            ======================================================== */}

            <aside
                className={`
                    fixed top-0 left-0 bottom-0 z-50
                    w-[255px]
                    bg-[#0b1220]
                    text-white
                    flex flex-col
                    shadow-2xl shadow-slate-950/20
                    transition-transform duration-300
                    lg:translate-x-0
                    ${
                        mobileSidebar
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* Logo */}

                <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/[0.07]">

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3"
                        onClick={() => setMobileSidebar(false)}
                    >

                        <div className="relative w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <LayoutDashboard size={18} />
                        </div>

                        <div>
                            <h1 className="text-[15px] font-bold tracking-tight">
                                MultiTenant
                            </h1>

                            <p className="text-[9px] text-slate-500 mt-0.5 tracking-wide">
                                MANAGEMENT SYSTEM
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={() => setMobileSidebar(false)}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Navigation */}

                <div className="flex-1 overflow-y-auto px-3 py-6">

                    <p className="px-3 mb-3 text-[9px] uppercase tracking-[0.18em] font-bold text-slate-600">
                        Workspace
                    </p>

                    <nav className="space-y-1">

                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                            onClick={() => setMobileSidebar(false)}
                        >
                            <LayoutDashboard size={17} />

                            <span className="text-[13px] font-medium">
                                Dashboard
                            </span>
                        </Link>

                        {isSuperAdmin && (
                            <Link
                                to="/create-company"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
                                onClick={() =>
                                    setMobileSidebar(false)
                                }
                            >
                                <Building2 size={17} />

                                <span className="text-[13px] font-medium">
                                    Companies
                                </span>
                            </Link>
                        )}

                        <Link
                            to="/products"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
                            onClick={() =>
                                setMobileSidebar(false)
                            }
                        >
                            <Package size={17} />

                            <span className="text-[13px] font-medium">
                                Products
                            </span>
                        </Link>

                        {isAdmin && (
                            <Link
                                to="/invite"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
                                onClick={() =>
                                    setMobileSidebar(false)
                                }
                            >
                                <UserPlus size={17} />

                                <span className="text-[13px] font-medium">
                                    Employees
                                </span>
                            </Link>
                        )}
                    </nav>

                    <p className="px-3 mt-8 mb-3 text-[9px] uppercase tracking-[0.18em] font-bold text-slate-600">
                        Management
                    </p>

                    <nav className="space-y-1">

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] transition">
                            <BarChart3 size={17} />

                            <span className="text-[13px] font-medium">
                                Analytics
                            </span>

                            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-600">
                                SOON
                            </span>
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] transition">
                            <Activity size={17} />

                            <span className="text-[13px] font-medium">
                                Activity
                            </span>

                            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-600">
                                SOON
                            </span>
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] transition">
                            <Settings size={17} />

                            <span className="text-[13px] font-medium">
                                Settings
                            </span>

                            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-600">
                                SOON
                            </span>
                        </button>
                    </nav>
                </div>

                {/* Sidebar user */}

                <div className="p-3 border-t border-white/[0.07]">

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">

                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
                            {initials}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate text-white">
                                {displayName}
                            </p>

                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                {roleName}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* ========================================================
                MAIN
            ======================================================== */}

            <div className="lg:ml-[255px] min-h-screen">

                {/* ====================================================
                    TOP BAR
                ==================================================== */}

                <header className="h-[76px] bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                setMobileSidebar(true)
                            }
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        >
                            <Menu size={20} />
                        </button>

                        <div>
                            <p className="text-[10px] text-slate-400 font-medium">
                                Workspace
                            </p>

                            <p className="text-sm font-semibold text-slate-800">
                                Overview
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* Search */}

                        <div className="hidden md:flex items-center w-[230px] h-9 bg-slate-50 border border-slate-200 rounded-lg px-3">

                            <Search
                                size={15}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full ml-2 bg-transparent outline-none text-xs text-slate-700 placeholder:text-slate-400"
                            />

                            <span className="text-[9px] text-slate-400 border border-slate-200 bg-white rounded px-1.5 py-0.5">
                                /
                            </span>
                        </div>

                        {/* Notification */}

                        <button className="relative w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition">
                            <Bell size={16} />

                            <span className="absolute top-[8px] right-[8px] w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        </button>

                        {/* Profile */}

                        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">

                            <div className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                                {initials}
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-xs font-semibold text-slate-800 max-w-[110px] truncate">
                                    {displayName}
                                </p>

                                <p className="text-[9px] text-slate-400">
                                    {roleName}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ====================================================
                    CONTENT
                ==================================================== */}

                <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-7">

                    {/* Breadcrumb */}

                    <div className="flex items-center gap-2 mb-6">

                        <span className="text-[11px] text-slate-400">
                            Home
                        </span>

                        <ChevronRight
                            size={12}
                            className="text-slate-300"
                        />

                        <span className="text-[11px] font-medium text-slate-600">
                            Dashboard
                        </span>
                    </div>

                    {/* =================================================
                        HERO
                    ================================================= */}

                    <section className="relative overflow-hidden rounded-2xl bg-[#0b1220] mb-6">

                        {/* Decorative shapes */}

                        <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />

                        <div className="absolute right-20 bottom-[-100px] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

                        <div className="relative p-6 sm:p-8 lg:p-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

                            <div>

                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/[0.08] mb-4">

                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                                    <span className="text-[10px] font-medium text-slate-300">
                                        System operational
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white">
                                    Good morning,{" "}
                                    <span className="text-blue-400">
                                        {displayName}
                                    </span>
                                </h1>

                                <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">
                                    Here's your workspace overview.
                                    Manage companies, products and
                                    users from one centralized
                                    dashboard.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">

                                {isSuperAdmin && (
                                    <Link
                                        to="/create-company"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
                                    >
                                        <Plus size={15} />
                                        Create Company
                                    </Link>
                                )}

                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] border border-white/10 text-white text-xs font-semibold hover:bg-white/[0.13] transition"
                                >
                                    View Products
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        KPI CARDS
                    ================================================= */}

                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                        {/* Companies */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition">

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-[11px] font-medium text-slate-400">
                                        {isSuperAdmin
                                            ? "Total Companies"
                                            : "Company"}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                        {isSuperAdmin
                                            ? companies.length
                                            : user.companyId ||
                                              "—"}
                                    </h2>
                                </div>

                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Building2
                                        size={19}
                                        className="text-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">

                                <span className="text-[10px] text-slate-400">
                                    Tenant management
                                </span>

                                <span className="text-[10px] font-semibold text-blue-600">
                                    Active
                                </span>
                            </div>
                        </div>

                        {/* Users */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition">

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-[11px] font-medium text-slate-400">
                                        Workspace Users
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                        —
                                    </h2>
                                </div>

                                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                                    <Users
                                        size={19}
                                        className="text-violet-600"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">

                                <span className="text-[10px] text-slate-400">
                                    Team members
                                </span>

                                {isAdmin && (
                                    <Link
                                        to="/invite"
                                        className="text-[10px] font-semibold text-violet-600"
                                    >
                                        Invite
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Products */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition">

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-[11px] font-medium text-slate-400">
                                        Products
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                        —
                                    </h2>
                                </div>

                                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                    <Package
                                        size={19}
                                        className="text-amber-600"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">

                                <span className="text-[10px] text-slate-400">
                                    Product catalog
                                </span>

                                <Link
                                    to="/products"
                                    className="text-[10px] font-semibold text-amber-600"
                                >
                                    Browse
                                </Link>
                            </div>
                        </div>

                        {/* Status */}

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition">

                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-[11px] font-medium text-slate-400">
                                        Account Status
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                        Active
                                    </h2>
                                </div>

                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <Activity
                                        size={19}
                                        className="text-emerald-600"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">

                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                                <span className="text-[10px] font-medium text-emerald-600">
                                    System access verified
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        LOWER GRID
                    ================================================= */}

                    <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

                        {/* =================================================
                            COMPANY OVERVIEW
                        ================================================= */}

                        {isSuperAdmin ? (
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                                {/* Header */}

                                <div className="px-6 py-5 border-b border-slate-100">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">
                                                Company Overview
                                            </h2>

                                            <p className="text-[11px] text-slate-400 mt-1">
                                                Manage your registered
                                                tenant companies.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">

                                            <div className="flex items-center gap-2 h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg">

                                                <Search
                                                    size={14}
                                                    className="text-slate-400"
                                                />

                                                <input
                                                    value={
                                                        companySearch
                                                    }
                                                    onChange={(e) =>
                                                        setCompanySearch(
                                                            e.target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Search company"
                                                    className="w-28 sm:w-36 bg-transparent outline-none text-[11px]"
                                                />
                                            </div>

                                            <Link
                                                to="/create-company"
                                                className="h-9 px-3 rounded-lg bg-slate-900 text-white text-[11px] font-semibold flex items-center gap-1.5 hover:bg-blue-600 transition"
                                            >
                                                <Plus size={13} />
                                                Add
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Company List */}

                                <div className="p-5">

                                    {loadingCompanies ? (
                                        <div className="py-16 text-center">

                                            <div className="w-8 h-8 mx-auto border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />

                                            <p className="mt-3 text-xs text-slate-400">
                                                Loading companies...
                                            </p>
                                        </div>
                                    ) : filteredCompanies.length ===
                                      0 ? (
                                        <div className="py-14 text-center">

                                            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center">
                                                <Building2
                                                    size={24}
                                                    className="text-slate-300"
                                                />
                                            </div>

                                            <h3 className="mt-4 text-sm font-semibold text-slate-700">
                                                No companies found
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-400">
                                                Create a company to
                                                get started.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">

                                            {filteredCompanies.map(
                                                (
                                                    company,
                                                    index
                                                ) => (
                                                    <div
                                                        key={
                                                            company._id
                                                        }
                                                        className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition"
                                                    >

                                                        {/* Company */}

                                                        <div className="flex items-center gap-3 flex-1 min-w-0">

                                                            <div className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition">

                                                                <Building2
                                                                    size={
                                                                        18
                                                                    }
                                                                    className="text-slate-500 group-hover:text-blue-600"
                                                                />
                                                            </div>

                                                            <div className="min-w-0">

                                                                <h3 className="text-sm font-semibold text-slate-800 truncate">
                                                                    {company.name ||
                                                                        "Unnamed Company"}
                                                                </h3>

                                                                <p className="text-[9px] font-mono text-slate-400 truncate mt-1">
                                                                    {
                                                                        company._id
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Status */}

                                                        <div className="hidden md:flex items-center gap-2 px-3">

                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                                                            <span className="text-[10px] font-medium text-emerald-600">
                                                                Active
                                                            </span>
                                                        </div>

                                                        {/* Actions */}

                                                        <div className="flex items-center gap-2">

                                                            <Link
                                                                to={`/company/${company._id}/comp-users`}
                                                                className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-[10px] font-semibold text-slate-600 flex items-center gap-1.5 hover:border-blue-200 hover:text-blue-600 transition"
                                                            >
                                                                <Users
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                                Users
                                                            </Link>

                                                            <Link
                                                                to={`/company/${company._id}`}
                                                                className="h-8 px-3 rounded-lg bg-slate-900 text-white text-[10px] font-semibold flex items-center gap-1.5 hover:bg-blue-600 transition"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        13
                                                                    }
                                                                />
                                                                View
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}

                                {filteredCompanies.length > 0 && (
                                    <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">

                                        <span className="text-[10px] text-slate-400">
                                            {filteredCompanies.length}{" "}
                                            companies displayed
                                        </span>

                                        <Link
                                            to="/create-company"
                                            className="text-[10px] font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700"
                                        >
                                            Manage companies
                                            <ArrowUpRight
                                                size={12}
                                            />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* =================================================
                               NON SUPERADMIN WORKSPACE
                            ================================================= */

                            <div className="bg-white border border-slate-200 rounded-2xl p-6">

                                <div className="flex items-center justify-between mb-6">

                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Workspace
                                        </h2>

                                        <p className="text-[11px] text-slate-400 mt-1">
                                            Your current company
                                            workspace.
                                        </p>
                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <Building2
                                            size={19}
                                            className="text-blue-600"
                                        />
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">

                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                        Company ID
                                    </p>

                                    <p className="mt-2 font-mono text-sm font-semibold text-slate-800 break-all">
                                        {user.companyId || "—"}
                                    </p>
                                </div>

                                <Link
                                    to="/products"
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition"
                                >
                                    Open Products
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        )}

                        {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}

                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                            <div className="px-5 py-5 border-b border-slate-100">

                                <h2 className="text-base font-bold text-slate-900">
                                    Quick Actions
                                </h2>

                                <p className="text-[11px] text-slate-400 mt-1">
                                    Frequently used tools
                                </p>
                            </div>

                            <div className="p-4 space-y-2">

                                {isSuperAdmin && (
                                    <Link
                                        to="/create-company"
                                        className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <Building2
                                                size={17}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">
                                                Create Company
                                            </p>

                                            <p className="text-[9px] text-slate-400 mt-0.5">
                                                Add a new tenant
                                            </p>
                                        </div>

                                        <ArrowUpRight
                                            size={14}
                                            className="text-slate-300 group-hover:text-blue-600 transition"
                                        />
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link
                                        to="/invite"
                                        className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <UserPlus
                                                size={17}
                                                className="text-emerald-600"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">
                                                Invite Employee
                                            </p>

                                            <p className="text-[9px] text-slate-400 mt-0.5">
                                                Add team member
                                            </p>
                                        </div>

                                        <ArrowUpRight
                                            size={14}
                                            className="text-slate-300 group-hover:text-emerald-600 transition"
                                        />
                                    </Link>
                                )}

                                {isEmployee && (
                                    <Link
                                        to="/create-product"
                                        className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/40 transition"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                                            <Plus
                                                size={17}
                                                className="text-violet-600"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">
                                                Add Product
                                            </p>

                                            <p className="text-[9px] text-slate-400 mt-0.5">
                                                Create product
                                            </p>
                                        </div>

                                        <ArrowUpRight
                                            size={14}
                                            className="text-slate-300 group-hover:text-violet-600 transition"
                                        />
                                    </Link>
                                )}

                                <Link
                                    to="/products"
                                    className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/40 transition"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                                        <Package
                                            size={17}
                                            className="text-amber-600"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-slate-800">
                                            View Products
                                        </p>

                                        <p className="text-[9px] text-slate-400 mt-0.5">
                                            Browse catalog
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={14}
                                        className="text-slate-300 group-hover:text-amber-600 transition"
                                    />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        BOTTOM INFORMATION
                    ================================================= */}

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <RoleIcon
                                    size={17}
                                    className="text-blue-600"
                                />
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                                    Access Level
                                </p>

                                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                                    {roleName}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <ShieldCheck
                                    size={17}
                                    className="text-emerald-600"
                                />
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                                    Security
                                </p>

                                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                                    RBAC Protected
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                                <Activity
                                    size={17}
                                    className="text-violet-600"
                                />
                            </div>

                            <div>
                                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                                    System
                                </p>

                                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                                    Operational
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}

                    <footer className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                        <p className="text-[10px] text-slate-400">
                            © {new Date().getFullYear()} MultiTenant
                            Management System
                        </p>

                        <p className="text-[10px] text-slate-400">
                            Secure • Scalable • Multi-Tenant
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;