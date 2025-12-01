import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, LogIn, User, DollarSign, Menu, Settings, X, LogOut, Home, Store } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems, currency, setCurrency } = useContext(CartContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition duration-200 ease-in-out font-medium ${isActive
            ? 'text-white bg-indigo-600 shadow-md'
            : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
        } flex items-center`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex items-center p-3 text-lg font-medium rounded-lg transition duration-200 ${isActive ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`;

    const buttonPrimary = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-md";

    const buttonOutline = "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg transition duration-150";

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                {/* 1. Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Raynott
                        <span className="text-indigo-600 text-base font-semibold ml-1">e-com</span>
                    </Link>
                </div>

                <nav className="hidden md:flex space-x-2">
                    <NavLink to="/" end className={navLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/products" className={navLinkClass}>
                        Shop
                    </NavLink>
                    {user?.isAdmin && (
                        <NavLink to="/admin" className={navLinkClass}>
                            <Settings className="w-4 h-4 mr-1" />
                            Admin
                        </NavLink>
                    )}
                </nav>

                <div className="flex items-center space-x-3 sm:space-x-4">

                    <div className="relative flex items-center">
                        <DollarSign className="w-4 h-4 text-gray-500 absolute left-2 pointer-events-none" />
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 p-2.5 transition duration-150"
                        >
                            <option value="USD">USD $</option>
                            <option value="INR">INR ₹</option>
                        </select>
                    </div>

                    <Link to="/cart" className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition duration-150">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <>
                                <span className="flex items-center text-sm font-medium text-gray-700">
                                    <User className="w-4 h-4 mr-1 text-indigo-500" />
                                    Hi, {user.name.split(' ')[0]}
                                </span>
                                <button onClick={logout} className={buttonPrimary}>
                                    <LogOut className="w-4 h-4 inline mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={buttonPrimary}>
                                    <LogIn className="w-4 h-4 inline mr-1" />
                                    Login
                                </Link>
                                <Link to="/register" className={buttonOutline}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-2xl p-6 flex flex-col space-y-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-indigo-600">Navigation</h3>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            <NavLink to="/" end className={mobileNavLinkClass} onClick={handleNavLinkClick}>
                                <Home className="w-5 h-5 mr-3" /> Home
                            </NavLink>
                            <NavLink to="/products" className={mobileNavLinkClass} onClick={handleNavLinkClick}>
                                <Store className="w-5 h-5 mr-3" /> Shop
                            </NavLink>
                            {user?.isAdmin && (
                                <NavLink to="/admin" className={mobileNavLinkClass} onClick={handleNavLinkClick}>
                                    <Settings className="w-5 h-5 mr-3" /> Admin Dashboard
                                </NavLink>
                            )}
                        </nav>

                        <div className="pt-6 border-t border-gray-200 space-y-4">
                            {user ? (
                                <>
                                    <div className="flex items-center text-lg font-medium text-gray-700">
                                        <User className="w-5 h-5 mr-3 text-indigo-500" />
                                        Signed in as: **{user.name}**
                                    </div>
                                    <button
                                        onClick={() => { logout(); handleNavLinkClick(); }}
                                        className={`${buttonPrimary} w-full flex items-center justify-center`}
                                    >
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link to="/login" className={`${buttonPrimary} text-center`} onClick={handleNavLinkClick}>
                                        <LogIn className="w-5 h-5 mr-2 inline" /> Login
                                    </Link>
                                    <Link to="/register" className={`${buttonOutline} text-center`} onClick={handleNavLinkClick}>
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;