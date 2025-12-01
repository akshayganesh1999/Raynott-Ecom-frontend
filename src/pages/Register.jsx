import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Lock, Globe, UserPlus } from 'lucide-react';

const Register = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        country: ""
    });
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMsg("");
        setIsLoading(true);

        axiosClient
            .post("/auth/register", form)
            .then((res) => {
                login(res.data);
                navigate("/");
            })
            .catch((err) => {
                const message = err.response?.data?.message || "Registration failed. Please check the details.";
                setMsg(message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const inputClass = "w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";

    const buttonPrimary = "w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg disabled:opacity-50";

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-200">

                <div className="text-center mb-8">
                    <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Raynott
                        <span className="text-indigo-600 text-base font-semibold ml-1">e-com</span>
                    </Link>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                        Create your account
                    </h2>
                    <p className="text-gray-500 text-sm">Join the global shopping community.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                            placeholder="Full name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                            type="email"
                            placeholder="Email address"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                            type="password"
                            placeholder="Password (min 6 characters)"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div className="relative">
                        <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                            placeholder="Country (e.g., USA, India)"
                            required
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <button
                        type="submit"
                        className={buttonPrimary}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <UserPlus className="w-5 h-5 mr-2" />
                        )}
                        {isLoading ? 'Registering...' : 'Create Account'}
                    </button>
                </form>

                {msg && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                        {msg}
                    </div>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="ml-1 font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;