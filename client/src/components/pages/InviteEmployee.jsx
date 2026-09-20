import React, { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    Copy,
    Mail,
    Send,
    ShieldCheck,
    UserPlus,
    Users,
} from "lucide-react";

const InviteEmployee = () => {
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInvite = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            return toast.error("Please enter employee email");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            return toast.error("Please enter a valid email address");
        }

        try {
            setLoading(true);
            setCopied(false);

            const res = await API.post("/invite", {
                email: trimmedEmail,
            });

            setLink(res.data.inviteLink);

            toast.success("Invitation created successfully");
        } catch (err) {
            console.error("Invite employee error:", err);

            toast.error(
                err?.response?.data?.message ||
                    "Error sending invitation. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!link) return;

        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);

            toast.success("Invite link copied!");

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Copy error:", err);
            toast.error("Unable to copy invite link");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
                        <Users size={19} className="text-white" />
                    </div>

                    <div>
                        <h1 className="font-bold text-[#0F172A] leading-tight">
                            MultiTenant
                        </h1>

                        <p className="text-[11px] text-[#64748B]">
                            Enterprise Management
                        </p>
                    </div>
                </div>

                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#475569] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition"
                >
                    <ArrowLeft size={16} />

                    <span className="hidden sm:inline">
                        Back to Dashboard
                    </span>

                    <span className="sm:hidden">Back</span>
                </Link>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <Link
                        to="/dashboard"
                        className="text-[#64748B] hover:text-[#2563EB] transition"
                    >
                        Dashboard
                    </Link>

                    <span className="text-[#CBD5E1]">/</span>

                    <span className="text-[#0F172A] font-medium">
                        Invite Employee
                    </span>
                </div>

                {/* Page Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <UserPlus
                                size={23}
                                className="text-[#2563EB]"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                Invite Employee
                            </h2>

                            <p className="text-sm text-[#64748B] mt-1">
                                Add a new employee to your company workspace.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    {/* Invite Form */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-5 border-b border-[#E2E8F0]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                                    <Mail
                                        size={18}
                                        className="text-[#475569]"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Employee Invitation
                                    </h3>

                                    <p className="text-sm text-[#64748B] mt-0.5">
                                        Enter the employee's email address.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleInvite}>
                            <div className="p-6">
                                <label
                                    htmlFor="employeeEmail"
                                    className="block text-sm font-semibold text-[#334155] mb-2"
                                >
                                    Employee Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                    />

                                    <input
                                        id="employeeEmail"
                                        type="email"
                                        placeholder="employee@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        disabled={loading}
                                        className="w-full h-11 pl-10 pr-4 border border-[#CBD5E1] rounded-lg text-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                                    />
                                </div>

                                <p className="text-xs text-[#94A3B8] mt-2">
                                    An invitation link will be generated for
                                    this employee.
                                </p>

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-6 inline-flex items-center justify-center gap-2 h-11 px-5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Creating Invitation...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={17} />
                                            Send Invitation
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Generated Link */}
                        {link && (
                            <div className="px-6 pb-6">
                                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                                        <CheckCircle2
                                            size={18}
                                            className="text-[#10B981]"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold text-[#166534]">
                                                Invitation Created
                                            </p>

                                            <p className="text-xs text-[#15803D]">
                                                Share the generated link with
                                                the employee.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-2">
                                            Invite Link
                                        </label>

                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                value={link}
                                                readOnly
                                                className="flex-1 min-w-0 h-10 px-3 border border-[#CBD5E1] bg-white rounded-lg text-xs sm:text-sm text-[#475569] outline-none"
                                            />

                                            <button
                                                type="button"
                                                onClick={copyToClipboard}
                                                className={`inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold transition ${
                                                    copied
                                                        ? "bg-[#10B981] text-white"
                                                        : "bg-[#2563EB] text-white hover:bg-blue-700"
                                                }`}
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle2
                                                            size={16}
                                                        />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={16} />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Side Information */}
                    <div className="space-y-5">
                        {/* Security */}
                        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                <ShieldCheck
                                    size={21}
                                    className="text-[#2563EB]"
                                />
                            </div>

                            <h3 className="font-semibold">
                                Secure Employee Access
                            </h3>

                            <p className="text-sm text-[#64748B] mt-1.5 leading-6">
                                Employee access is handled through your
                                existing tenant invitation workflow.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />

                                    <span className="text-sm text-[#475569]">
                                        Email address verification
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />

                                    <span className="text-sm text-[#475569]">
                                        Tenant-specific invitation
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />

                                    <span className="text-sm text-[#475569]">
                                        Controlled employee onboarding
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Workflow */}
                        <div className="bg-[#0B1220] rounded-2xl p-5 text-white">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Invitation Workflow
                            </p>

                            <div className="mt-4 space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                                        1
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Enter Email
                                        </p>

                                        <p className="text-xs text-slate-400 mt-1">
                                            Provide the employee's email
                                            address.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                                        2
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Generate Invite
                                        </p>

                                        <p className="text-xs text-slate-400 mt-1">
                                            Your server creates the invitation
                                            link.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                                        3
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Share Link
                                        </p>

                                        <p className="text-xs text-slate-400 mt-1">
                                            Copy and send the invitation to
                                            the employee.
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

export default InviteEmployee;