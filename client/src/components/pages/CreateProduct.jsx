import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    BadgeIndianRupee,
    Box,
    CheckCircle2,
    PackagePlus,
    Save,
    Tag,
} from "lucide-react";

const CreateProduct = () => {
    const [form, setForm] = useState({
        name: "",
        price: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.price) {
            return toast.error("All fields are required");
        }

        if (Number(form.price) <= 0) {
            return toast.error("Product price must be greater than 0");
        }

        try {
            setLoading(true);

            await API.post("/products", {
                name: form.name.trim(),
                price: Number(form.price),
            });

            toast.success("Product created successfully");

            setForm({
                name: "",
                price: "",
            });
        } catch (err) {
            console.error("Create product error:", err);

            toast.error(
                err?.response?.data?.message ||
                    "Error creating product. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#0F172A]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
                        <Box size={19} className="text-white" />
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
                    to="/all-products"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#475569] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Back to Products</span>
                    <span className="sm:hidden">Back</span>
                </Link>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <Link
                        to="/all-products"
                        className="text-[#64748B] hover:text-[#2563EB] transition"
                    >
                        Products
                    </Link>

                    <span className="text-[#CBD5E1]">/</span>

                    <span className="text-[#0F172A] font-medium">
                        Create Product
                    </span>
                </div>

                {/* Page heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <PackagePlus
                                size={23}
                                className="text-[#2563EB]"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                Create Product
                            </h2>

                            <p className="text-sm text-[#64748B] mt-1">
                                Add a new product to your tenant inventory.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    {/* Form Card */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
                        {/* Card Header */}
                        <div className="px-6 py-5 border-b border-[#E2E8F0]">
                            <h3 className="text-lg font-semibold">
                                Product Information
                            </h3>

                            <p className="text-sm text-[#64748B] mt-1">
                                Enter the basic details for the new product.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                {/* Product Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-[#334155] mb-2"
                                    >
                                        Product Name
                                    </label>

                                    <div className="relative">
                                        <Tag
                                            size={18}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                        />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="e.g. Premium Laptop"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full h-11 pl-10 pr-4 border border-[#CBD5E1] rounded-lg text-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <p className="text-xs text-[#94A3B8] mt-2">
                                        Use a clear and recognizable product
                                        name.
                                    </p>
                                </div>

                                {/* Product Price */}
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-semibold text-[#334155] mb-2"
                                    >
                                        Product Price
                                    </label>

                                    <div className="relative">
                                        <BadgeIndianRupee
                                            size={18}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                        />

                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="e.g. 49999"
                                            value={form.price}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full h-11 pl-10 pr-4 border border-[#CBD5E1] rounded-lg text-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <p className="text-xs text-[#94A3B8] mt-2">
                                        Enter the selling price in Indian
                                        Rupees.
                                    </p>
                                </div>

                                {/* Preview */}
                                {(form.name || form.price) && (
                                    <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-blue-100">
                                                <Box
                                                    size={18}
                                                    className="text-[#2563EB]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                                    Product Preview
                                                </p>

                                                <h4 className="font-semibold text-[#0F172A] mt-1 truncate">
                                                    {form.name ||
                                                        "Product name"}
                                                </h4>

                                                <p className="text-sm text-[#2563EB] font-semibold mt-1">
                                                    {form.price
                                                        ? `₹${Number(
                                                              form.price
                                                          ).toLocaleString(
                                                              "en-IN"
                                                          )}`
                                                        : "₹0"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                                <Link
                                    to="/all-products"
                                    className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-[#475569] border border-[#CBD5E1] bg-white rounded-lg hover:bg-[#F8FAFC] transition"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex justify-center items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={17} />
                                            Create Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Information Panel */}
                    <div className="space-y-5">
                        {/* Secure Card */}
                        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                                <CheckCircle2
                                    size={21}
                                    className="text-[#10B981]"
                                />
                            </div>

                            <h3 className="font-semibold text-[#0F172A]">
                                Product Setup
                            </h3>

                            <p className="text-sm text-[#64748B] mt-1.5 leading-6">
                                Add accurate product information so it can be
                                managed across your tenant.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />
                                    <span className="text-sm text-[#475569]">
                                        Product name is required
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />
                                    <span className="text-sm text-[#475569]">
                                        Price must be greater than zero
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2
                                        size={17}
                                        className="text-[#10B981] mt-0.5 shrink-0"
                                    />
                                    <span className="text-sm text-[#475569]">
                                        Product is submitted securely
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Workflow Card */}
                        <div className="bg-[#0B1220] rounded-2xl p-5 text-white">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Workflow
                            </p>

                            <h3 className="text-lg font-semibold mt-2">
                                Add → Manage → Monitor
                            </h3>

                            <p className="text-sm text-slate-400 mt-2 leading-6">
                                Create your product first, then manage it from
                                the centralized Products section.
                            </p>

                            <div className="mt-5 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Box size={16} />
                                    <span>Centralized product management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateProduct;