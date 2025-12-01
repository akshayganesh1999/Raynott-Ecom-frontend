import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosConfig";
import { ShoppingCart, Clock, Truck, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = useCallback(() => {
        setIsLoading(true);
        axiosClient
            .get("/orders")
            .then((res) => {
                const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
                setMsg("");
            })
            .catch(() => {
                setMsg("Failed to load order data.");
                setOrders([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusChange = (id, newStatus) => {
        setMsg("Updating status...");

        axiosClient
            .put(`/orders/${id}`, { status: newStatus })
            .then(() => {
                setMsg("Status updated successfully.");
                setOrders(prevOrders => prevOrders.map(order =>
                    order._id === id ? { ...order, status: newStatus } : order
                ));
            })
            .catch(() => setMsg("Failed to update status."))
            .finally(() => {
                setTimeout(() => setMsg(""), 3000);
            });
    };

    const getStatusClasses = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 flex items-center';
            case 'processing':
                return 'bg-blue-100 text-blue-800 flex items-center';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800 flex items-center';
            case 'delivered':
                return 'bg-green-100 text-green-800 flex items-center';
            case 'cancelled':
                return 'bg-red-100 text-red-800 flex items-center';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 mr-1" />;
            case 'processing': return <Loader2 className="w-4 h-4 mr-1 animate-spin" />;
            case 'shipped': return <Truck className="w-4 h-4 mr-1" />;
            case 'delivered': return <CheckCircle className="w-4 h-4 mr-1" />;
            case 'cancelled': return <XCircle className="w-4 h-4 mr-1" />;
            default: return null;
        }
    };

    return (
        <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        <ShoppingCart className="w-7 h-7 mr-3 text-indigo-600" />
                        Manage Orders
                    </h2>
                    <p className="mt-1 text-lg text-gray-500">
                        Track and update customer order status throughout the fulfillment cycle.
                    </p>
                </div>

                {msg && (
                    <div
                        className={`mb-6 p-3 rounded-lg flex items-center text-sm ${msg.includes("successfully") ? 'bg-green-100 border border-green-400 text-green-700' :
                                msg.includes("failed") || msg.includes("Updating") ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' : ''
                            }`}
                    >
                        {msg.includes("successfully") ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertTriangle className="w-5 h-5 mr-2" />}
                        {msg}
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center text-indigo-600 py-10 justify-center">
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        <span className="text-lg font-medium">Loading orders...</span>
                    </div>
                )}

                {!isLoading && (
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID / User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Placed At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change Status</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((o) => (
                                    <tr key={o._id} className="hover:bg-indigo-50/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-semibold text-gray-900 truncate max-w-xs">{o.user?.email || "N/A"}</p>
                                            <p className="text-xs text-gray-500">{o._id.slice(-6)}</p> {/* Show truncated ID */}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            ${o.totalPriceUSD?.toFixed(2) || '0.00'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {new Date(o.createdAt).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClasses(o.status || "pending")}`}
                                            >
                                                {getStatusIcon(o.status || "pending")}
                                                {o.status || "pending"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <select
                                                value={o.status || "pending"}
                                                onChange={(e) =>
                                                    handleStatusChange(o._id, e.target.value)
                                                }
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm bg-white"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}

                                {!orders.length && !isLoading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                                            No customer orders found.
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

export default AdminOrders;