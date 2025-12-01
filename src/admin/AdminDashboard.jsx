import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";
import { Users, Package, ShoppingCart, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        productCount: 0,
        orderCount: 0,
        loading: true,
    });

    useEffect(() => {
        setStats(prev => ({ ...prev, loading: true }));
        axiosClient
            .get("/admin/stats")
            .then((res) => setStats({ ...res.data, loading: false }))
            .catch(() => {
                setStats({ userCount: 0, productCount: 0, orderCount: 0, loading: false });
            });
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`p-3 rounded-full ${color}/10 mr-3`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600">{title}</h3>
                </div>

            </div>

            <div className="mt-4">
                {stats.loading ? (
                    <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                ) : (
                    <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {value.toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        <span className="mr-2 text-indigo-600">Admin Dashboard</span>
                    </h2>
                    <p className="mt-1 text-lg text-gray-500">
                        Overview of Raynott e-com activity and key metrics.
                    </p>
                </div>

                {stats.loading && (
                    <div className="flex items-center text-indigo-600 mb-6">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        <span>Loading key statistics...</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <StatCard
                        title="Total Users"
                        value={stats.userCount}
                        icon={Users}
                        color="text-indigo-600 bg-indigo-100"
                    />

                    <StatCard
                        title="Total Products"
                        value={stats.productCount}
                        icon={Package}
                        color="text-green-600 bg-green-100"
                    />

                    <StatCard
                        title="Total Orders"
                        value={stats.orderCount}
                        icon={ShoppingCart}
                        color="text-yellow-600 bg-yellow-100"
                    />

                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;