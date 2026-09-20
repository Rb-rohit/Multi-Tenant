import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Box,
    CheckCircle2,
    Package,
    PackageSearch,
    RefreshCw,
    Search,
    Tag,
} from "lucide-react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await API.get("/products");
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Products fetch error:", err);
            setError(
                err?.response?.data?.message ||
                    "Unable to load products. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return products;

        return products.filter((product) =>
            product.name?.toLowerCase().includes(query)
        );
    }, [products, search]);

    const totalValue = products.reduce(
        (total, product) => total + Number(product.price || 0),
        0
    );

    const formatPrice = (price) => {
        return `₹${Number(price || 0).toLocaleString("en-IN")}`;
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

                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchProducts}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-sm font-medium text-[#475569] border border-[#E2E8F0] bg-white rounded-lg hover:bg-[#F8FAFC] transition disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />

                        <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#475569] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition"
                    >
                        <ArrowLeft size={16} />

                        <span className="hidden sm:inline">
                            Dashboard
                        </span>

                        <span className="sm:hidden">Back</span>
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                        My Products
                    </span>
                </div>

                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <PackageSearch
                                size={23}
                                className="text-[#2563EB]"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                My Products
                            </h2>

                            <p className="text-sm text-[#64748B] mt-1">
                                View and manage products available in your
                                workspace.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/create-product"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                        <Package size={17} />
                        Add Product
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#64748B]">
                                    Total Products
                                </p>

                                <p className="text-2xl font-bold mt-1">
                                    {products.length}
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Package
                                    size={19}
                                    className="text-[#2563EB]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#64748B]">
                                    Available
                                </p>

                                <p className="text-2xl font-bold mt-1">
                                    {products.length}
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <CheckCircle2
                                    size={19}
                                    className="text-[#10B981]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#64748B]">
                                    Product Value
                                </p>

                                <p className="text-2xl font-bold mt-1">
                                    {formatPrice(totalValue)}
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                <Tag
                                    size={19}
                                    className="text-[#F59E0B]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-[#E2E8F0]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-[#0F172A]">
                                    Product Catalog
                                </h3>

                                <p className="text-sm text-[#64748B] mt-1">
                                    {filteredProducts.length}{" "}
                                    {filteredProducts.length === 1
                                        ? "product"
                                        : "products"}{" "}
                                    displayed
                                </p>
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                                />

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full h-10 pl-10 pr-4 border border-[#CBD5E1] rounded-lg text-sm outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="p-10 flex flex-col items-center justify-center">
                            <div className="w-9 h-9 border-2 border-blue-100 border-t-[#2563EB] rounded-full animate-spin" />

                            <p className="text-sm text-[#64748B] mt-4">
                                Loading products...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center">
                                <PackageSearch
                                    size={22}
                                    className="text-[#EF4444]"
                                />
                            </div>

                            <h3 className="font-semibold mt-4">
                                Unable to load products
                            </h3>

                            <p className="text-sm text-[#64748B] mt-1">
                                {error}
                            </p>

                            <button
                                onClick={fetchProducts}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading &&
                        !error &&
                        filteredProducts.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <PackageSearch
                                        size={25}
                                        className="text-[#64748B]"
                                    />
                                </div>

                                <h3 className="font-semibold mt-4">
                                    {search
                                        ? "No matching products"
                                        : "No products found"}
                                </h3>

                                <p className="text-sm text-[#64748B] mt-1 max-w-sm mx-auto">
                                    {search
                                        ? "Try changing your search term."
                                        : "There are currently no products available in your workspace."}
                                </p>

                                {!search && (
                                    <Link
                                        to="/create-product"
                                        className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                                    >
                                        <Package size={16} />
                                        Create Product
                                    </Link>
                                )}
                            </div>
                        )}

                    {/* Desktop Table */}
                    {!loading &&
                        !error &&
                        filteredProducts.length > 0 && (
                            <>
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                                    Product
                                                </th>

                                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                                    Price
                                                </th>

                                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-[#E2E8F0]">
                                            {filteredProducts.map(
                                                (product) => (
                                                    <tr
                                                        key={product._id}
                                                        className="hover:bg-[#F8FAFC] transition"
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                                                    <Box
                                                                        size={
                                                                            17
                                                                        }
                                                                        className="text-[#2563EB]"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <p className="text-sm font-semibold text-[#0F172A]">
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </p>

                                                                    <p className="text-xs text-[#94A3B8] mt-0.5">
                                                                        Product
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span className="text-sm font-semibold text-[#0F172A]">
                                                                {formatPrice(
                                                                    product.price
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#047857] text-xs font-semibold">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                                                Available
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-[#E2E8F0]">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className="p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                                        <Box
                                                            size={18}
                                                            className="text-[#2563EB]"
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold text-sm truncate">
                                                            {product.name}
                                                        </h4>

                                                        <p className="text-xs text-[#64748B] mt-1">
                                                            Product
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-[#047857] text-[11px] font-semibold shrink-0">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                                    Available
                                                </span>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                                                <p className="text-xs text-[#64748B]">
                                                    Price
                                                </p>

                                                <p className="text-lg font-bold mt-0.5">
                                                    {formatPrice(
                                                        product.price
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                </div>
            </main>
        </div>
    );
};

export default Products;