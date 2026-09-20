import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Building2,
    ChevronRight,
    Package,
    RefreshCw,
    Search,
    ShoppingBag,
    TrendingUp,
    AlertCircle,
    Plus,
} from "lucide-react";

const AllProducts = () => {
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
            console.error(err);
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
        const query = search.toLowerCase().trim();

        if (!query) return products;

        return products.filter((product) => {
            const name = product.name?.toLowerCase() || "";
            const company = product.companyId?.toString().toLowerCase() || "";

            return name.includes(query) || company.includes(query);
        });
    }, [products, search]);

    const totalProducts = products.length;

    const averagePrice =
        products.length > 0
            ? products.reduce(
                  (sum, product) => sum + Number(product.price || 0),
                  0
              ) / products.length
            : 0;

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
                        <TrendingUp size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/all-products"
                        className="mb-1 flex items-center gap-3 rounded-xl bg-[#2563EB] px-3 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30"
                    >
                        <Package size={18} />
                        All Products
                    </Link>

                    <Link
                        to="/products"
                        className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <ShoppingBag size={18} />
                        My Products
                    </Link>

                    <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                        Management
                    </p>

                    <Link
                        to="/create-product"
                        className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <Plus size={18} />
                        Create Product
                    </Link>
                </nav>

                {/* Bottom */}
                <div className="border-t border-white/10 p-4">
                    <div className="rounded-xl bg-white/5 p-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <Package size={17} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white">
                                    Product Management
                                </p>
                                <p className="text-[10px] text-slate-500">
                                    Manage your inventory
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
                    <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
                        <div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Link
                                    to="/dashboard"
                                    className="hover:text-[#2563EB]"
                                >
                                    Dashboard
                                </Link>

                                <ChevronRight size={13} />

                                <span className="text-slate-500">
                                    Products
                                </span>
                            </div>

                            <h1 className="mt-1 text-xl font-bold tracking-tight text-[#0F172A]">
                                All Products
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={fetchProducts}
                                disabled={loading}
                                className="flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-[#CBD5E1] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
                                to="/create-product"
                                className="flex h-10 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                            >
                                <Plus size={17} />
                                <span className="hidden sm:inline">
                                    Add Product
                                </span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <section className="p-5 sm:p-8">
                    {/* Intro */}
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Product Directory
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View and manage products across your tenant
                            companies.
                        </p>
                    </div>

                    {/* ================= STATS ================= */}
                    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {/* Total */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Total Products
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                                        {loading ? "—" : totalProducts}
                                    </h3>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                                    <Package size={21} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Across all companies
                            </p>
                        </div>

                        {/* Average */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Average Price
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                                        {loading
                                            ? "—"
                                            : `₹${averagePrice.toLocaleString(
                                                  "en-IN",
                                                  {
                                                      maximumFractionDigits: 0,
                                                  }
                                              )}`}
                                    </h3>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <TrendingUp size={21} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Average listed product price
                            </p>
                        </div>

                        {/* Companies */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Product Coverage
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold tracking-tight">
                                        {loading ? "—" : "Multi-Tenant"}
                                    </h3>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <Building2 size={21} />
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-400">
                                Centralized product visibility
                            </p>
                        </div>
                    </div>

                    {/* ================= TABLE CARD ================= */}
                    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                        {/* Toolbar */}
                        <div className="flex flex-col gap-4 border-b border-[#E2E8F0] p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-semibold text-[#0F172A]">
                                    Product List
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    {filteredProducts.length} product
                                    {filteredProducts.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    displayed
                                </p>
                            </div>

                            <div className="relative w-full sm:w-[300px]">
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
                                    placeholder="Search products..."
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
                                    onClick={fetchProducts}
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
                                        className="h-[68px] animate-pulse rounded-xl bg-slate-100"
                                    />
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            /* Empty */
                            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <Package size={28} />
                                </div>

                                <h3 className="mt-5 text-base font-semibold">
                                    {search
                                        ? "No matching products"
                                        : "No products found"}
                                </h3>

                                <p className="mt-1 max-w-sm text-sm text-slate-400">
                                    {search
                                        ? "Try changing your search keywords."
                                        : "Create your first product to start managing your inventory."}
                                </p>

                                {!search && (
                                    <Link
                                        to="/create-product"
                                        className="mt-5 flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        <Plus size={16} />
                                        Create Product
                                    </Link>
                                )}
                            </div>
                        ) : (
                            /* Desktop Table */
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-left">
                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Product
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Price
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Company
                                            </th>

                                            <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#E2E8F0]">
                                        {filteredProducts.map(
                                            (product, index) => (
                                                <tr
                                                    key={product._id}
                                                    className="group transition hover:bg-[#F8FAFC]"
                                                >
                                                    {/* Product */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-semibold text-[#2563EB]">
                                                                {product.name
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    ?.toUpperCase() ||
                                                                    "P"}
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-semibold text-[#0F172A]">
                                                                    {product.name ||
                                                                        "Unnamed Product"}
                                                                </p>

                                                                <p className="mt-0.5 text-xs text-slate-400">
                                                                    ID:{" "}
                                                                    {product._id?.slice(
                                                                        -8
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Price */}
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-semibold text-[#0F172A]">
                                                            ₹{" "}
                                                            {Number(
                                                                product.price ||
                                                                    0
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Company */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                                                <Building2
                                                                    size={15}
                                                                />
                                                            </div>

                                                            <span className="max-w-[220px] truncate font-mono text-xs text-slate-500">
                                                                {product.companyId ||
                                                                    "—"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            Active
                                                        </span>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-[#2563EB] opacity-80 transition hover:bg-blue-50 hover:opacity-100"
                                                        >
                                                            View
                                                            <ChevronRight
                                                                size={14}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Footer info */}
                    {!loading && products.length > 0 && (
                        <div className="mt-5 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                Showing {filteredProducts.length} of{" "}
                                {products.length} products
                            </p>

                            <p>
                                Product data is managed through your
                                Multi-Tenant API.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AllProducts;