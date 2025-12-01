import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosConfig";
import { Trash2, User, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = useCallback(() => {
        setIsLoading(true);
        axiosClient
            .get("/users")
            .then((res) => {
                setUsers(res.data);
                setMsg("");
            })
            .catch(() => {
                setMsg("Failed to load user data.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
        setMsg("Deleting user...");

        axiosClient
            .delete(`/users/${id}`)
            .then(() => {
                setMsg("User deleted successfully.");
                setUsers(prev => prev.filter(user => user._id !== id));
            })
            .catch(() => setMsg("Failed to delete user."))
            .finally(() => {
                setTimeout(() => setMsg(""), 3000);
            });
    };

    return (
        <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        <User className="w-7 h-7 mr-3 text-indigo-600" />
                        Manage Users
                    </h2>
                    <p className="mt-1 text-lg text-gray-500">
                        View, track, and manage all registered users and their roles.
                    </p>
                </div>

                {msg && (
                    <div
                        className={`mb-6 p-3 rounded-lg flex items-center text-sm ${msg.includes("success") ? 'bg-green-100 border border-green-400 text-green-700' :
                                msg.includes("Failed") || msg.includes("Deleting") ? 'bg-yellow-100 border border-yellow-400 text-yellow-700' : ''
                            }`}
                    >
                        {msg.includes("success") ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertTriangle className="w-5 h-5 mr-2" />}
                        {msg}
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center text-indigo-600 py-10 justify-center">
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        <span className="text-lg font-medium">Loading user data...</span>
                    </div>
                )}

                {!isLoading && (
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Joined Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((u) => (
                                    <tr key={u._id} className="hover:bg-indigo-50/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {u.role !== "admin" ? (
                                                <button
                                                    onClick={() => handleDelete(u._id)}
                                                    className="text-red-600 hover:text-red-900 transition duration-150 p-2 rounded-full hover:bg-red-50"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">System Admin</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {!users.length && !isLoading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                                            No users found in the database.
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

export default AdminUsers;