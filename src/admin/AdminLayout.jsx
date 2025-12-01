import React, { useContext, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center p-3 rounded-lg transition duration-200 ${isActive
            ? "bg-indigo-600 text-white shadow-md font-semibold"
            : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
        }`;

    const toggleButtonClass = "p-2 text-gray-700 hover:text-indigo-600 transition duration-150 rounded-lg hover:bg-gray-100";

    return (
        <div className="min-h-screen flex bg-gray-50">

            <aside
                className={`hidden lg:flex flex-col border-r border-gray-200 bg-white shadow-xl h-screen fixed top-0 left-0 transition-width duration-300 ease-in-out z-30
          ${collapsed ? "w-20" : "w-64"}`}
            >
                <div className="p-4 flex items-center justify-center border-b border-gray-200 h-16">
                    <Link to="/admin" className={`font-extrabold text-2xl text-indigo-600 overflow-hidden ${collapsed ? 'hidden' : 'block'}`}>
                        Raynott <span className="text-sm font-semibold text-gray-700">Admin</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className={`p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition ${collapsed ? 'block' : 'hidden'}`}
                        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="flex flex-col p-4 space-y-2 flex-grow">
                    <NavLink to="/admin" end className={navLinkClasses}>
                        <LayoutDashboard className={`w-6 h-6 ${!collapsed ? 'mr-3' : 'mx-auto'}`} />
                        <span className={`transition-opacity duration-150 ${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/products" className={navLinkClasses}>
                        <Package className={`w-6 h-6 ${!collapsed ? 'mr-3' : 'mx-auto'}`} />
                        <span className={`transition-opacity duration-150 ${collapsed ? 'hidden' : 'block'}`}>Products</span>
                    </NavLink>

                    <NavLink to="/admin/orders" className={navLinkClasses}>
                        <ShoppingCart className={`w-6 h-6 ${!collapsed ? 'mr-3' : 'mx-auto'}`} />
                        <span className={`transition-opacity duration-150 ${collapsed ? 'hidden' : 'block'}`}>Orders</span>
                    </NavLink>

                    <NavLink to="/admin/users" className={navLinkClasses}>
                        <Users className={`w-6 h-6 ${!collapsed ? 'mr-3' : 'mx-auto'}`} />
                        <span className={`transition-opacity duration-150 ${collapsed ? 'hidden' : 'block'}`}>Users</span>
                    </NavLink>
                </nav>
            </aside>

            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div className="bg-white w-64 h-full p-4 flex flex-col shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <Link to="/admin" className="font-extrabold text-2xl text-indigo-600">
                                Raynott <span className="text-sm font-semibold text-gray-700">Admin</span>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className={toggleButtonClass}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-2">
                            <NavLink to="/admin" end className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                                <LayoutDashboard className="w-6 h-6 mr-3" /> Dashboard
                            </NavLink>
                            <NavLink to="/admin/products" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                                <Package className="w-6 h-6 mr-3" /> Products
                            </NavLink>
                            <NavLink to="/admin/orders" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                                <ShoppingCart className="w-6 h-6 mr-3" /> Orders
                            </NavLink>
                            <NavLink to="/admin/users" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                                <Users className="w-6 h-6 mr-3" /> Users
                            </NavLink>
                        </nav>
                    </div>
                </div>
            )}

            <div
                className={`flex-1 flex flex-col transition-margin duration-300 ease-in-out ${collapsed ? "lg:ml-20" : "lg:ml-64"
                    }`}
            >
                <header className="flex justify-between items-center h-16 bg-white shadow-md px-6 z-20 sticky top-0">

                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            className={`${toggleButtonClass} lg:hidden`}
                            onClick={() => setMobileMenuOpen(true)}
                            title="Open Menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            className={`${toggleButtonClass} hidden ${collapsed ? 'lg:block' : 'lg:hidden'}`}
                            onClick={() => setCollapsed((c) => !c)}
                            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 text-sm font-medium hidden sm:block">
                            Welcome, {user?.name} (<span className="text-indigo-600 capitalize">{user?.role}</span>)
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition duration-200"
                        >
                            <LogOut className="w-4 h-4 mr-1" />
                            Logout
                        </button>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-grow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;