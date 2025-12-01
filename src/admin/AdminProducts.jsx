import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosConfig";
import { Package, Plus, Trash2, Edit, Eye, TrendingDown, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = useCallback(() => {
        setIsLoading(true);
        axiosClient
            .get("/products")
            .then((res) => setProducts(res.data))
            .catch(() => {
                setMsg("Failed to load product data.");
                setProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => setMsg(""), 3000);
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
        setMsg("Deleting product...");

        axiosClient
            .delete(`/products/${id}`)
            .then(() => {
                setMsg("Product deleted successfully.");
                setProducts(prev => prev.filter(p => p._id !== id));
            })
            .catch(() => setMsg("Failed to delete product."))
            .finally(() => {
                setTimeout(() => setMsg(""), 3000);
            });
    };

    const buttonPrimary = "flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md";

    const buttonDelete = "text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-50";

    return (
        <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        <Package className="w-7 h-7 mr-3 text-indigo-600" />
                        Manage Products
                    </h2>
                    <button
                        className={buttonPrimary}
                        onClick={() => navigate("/admin/products/new")}
                    >
                        <Plus className="w-5 h-5 mr-1" />
                        Add Product
                    </button>
                </div>

                {msg && (
                    <div
                        className={`mb-6 p-3 rounded-lg flex items-center text-sm ${msg.includes("successfully") ? 'bg-green-100 border border-green-400 text-green-700' :
                                msg.includes("failed") || msg.includes("Deleting") ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' : ''
                            }`}
                    >
                        {msg.includes("successfully") ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertTriangle className="w-5 h-5 mr-2" />}
                        {msg}
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center text-indigo-600 py-10 justify-center">
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        <span className="text-lg font-medium">Loading product data...</span>
                    </div>
                )}

                {!isLoading && (
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((p) => (
                                    <tr key={p._id} className="hover:bg-indigo-50/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={p.image || 'https://via.placeholder.com/50'}
                                                alt={p.name}
                                                className="w-12 h-12 object-cover object-center rounded-md border border-gray-100"
                                            />
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{p.category}</td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">${p.priceUSD.toFixed(2)}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${p.inStock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                                                >
                                                    {p.inStock} in stock
                                                </span>
                                                {p.inStock < 10 && (
                                                    <TrendingDown className="w-4 h-4 ml-1 text-red-600" title="Low Stock" />
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => navigate(`/admin/products/${p._id}`)}
                                                    className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-2 rounded-full hover:bg-indigo-50"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <Link
                                                    to={`/products/${p._id}`}
                                                    className="text-gray-600 hover:text-gray-900 transition duration-150 p-2 rounded-full hover:bg-gray-100"
                                                    title="View Product Page"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(p._id)}
                                                    className={buttonDelete}
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {!products.length && !isLoading && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500 text-lg">
                                            No products found. Click "Add Product" to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminProducts;