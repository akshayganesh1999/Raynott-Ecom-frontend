import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, ShieldCheck } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const FooterLink = ({ to, children }) => (
        <Link
            to={to}
            className="text-gray-400 hover:text-indigo-400 transition duration-200 text-sm mb-2 block"
        >
            {children}
        </Link>
    );

    return (
        <footer className="bg-gray-800 text-white mt-16 border-t border-indigo-500/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight mb-2 block">
                            Raynott
                            <span className="text-indigo-400 text-base font-semibold ml-1">e-com</span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-xs">
                            International e-commerce for modern shoppers. Discover global styles effortlessly.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-1">Quick Links</h4>
                        <nav>
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/products">All Products</FooterLink>
                            <FooterLink to="/returns">Return Policy</FooterLink>
                            <FooterLink to="/faq">FAQ</FooterLink>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-1">Support</h4>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-400 hover:text-indigo-400 transition duration-200">
                                <Mail className="w-4 h-4 mr-2" />
                                <a href="mailto:help@raynott-ecom.com" className="text-sm">help@raynott-ecom.com</a>
                            </div>
                            <div className="flex items-center text-gray-400 hover:text-indigo-400 transition duration-200">
                                <Phone className="w-4 h-4 mr-2" />
                                <a href="tel:+18005557296" className="text-sm">+1 (800) 555-RAYN</a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-1">Global Presence</h4>
                        <div className="flex items-center text-gray-400 mb-2">
                            <Globe className="w-4 h-4 mr-2 text-indigo-400" />
                            <span className="text-sm">US • Europe • Asia-Pacific</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-3">
                            Shipping to 100+ countries with localized support.
                        </p>
                    </div>

                </div>
            </div>

            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

                    <span className="text-gray-400 text-sm mb-2 md:mb-0">
                        © {currentYear} Raynott e-com. All rights reserved.
                    </span>

                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
                            Secure payments
                        </span>
                        <span>|</span>
                        <span>
                            Worldwide shipping
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;