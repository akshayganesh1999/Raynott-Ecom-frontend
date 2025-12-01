import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, LogIn, User, DollarSign, Menu, Settings } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems, currency, setCurrency } = useContext(CartContext);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-lg transition duration-200 ease-in-out font-medium ${isActive
            ? 'text-white bg-indigo-600 shadow-md'
            : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
        } flex items-center`;

    const buttonPrimary = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-md";

    const buttonOutline = "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg transition duration-150";


    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

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
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="flex items-center text-sm font-medium text-gray-700">
                                <User className="w-4 h-4 mr-1 text-indigo-500" />
                                Hi, {user.name}
                            </span>
                            <button onClick={logout} className={buttonPrimary}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center space-x-3">
                            <Link to="/login" className={buttonPrimary}>
                                <LogIn className="w-4 h-4 inline mr-1" />
                                Login
                            </Link>
                            <Link to="/register" className={buttonOutline}>
                                Register
                            </Link>
                        </div>
                    )}

                    <button className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;