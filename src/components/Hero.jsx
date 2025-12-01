import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Truck, Zap } from 'lucide-react';

const Hero = () => {

    const buttonPrimary = "inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-0.5 whitespace-nowrap";

    const buttonOutline = "inline-flex items-center justify-center border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition duration-300 whitespace-nowrap";

    return (
        <section className="bg-gray-50 pt-16 pb-24 sm:pt-24 lg:pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center order-2 lg:order-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                            Shop <span className="text-indigo-600">globally,</span> feel locally.
                        </h1>

                        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl">
                            Raynott e-com connects you with curated products from around the world, featuring transparent pricing in your local currency. Experience seamless international shopping.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/products" className={buttonPrimary}>
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Start Shopping
                            </Link>
                            <a href="#featured" className={buttonOutline}>
                                View Featured
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-5 relative order-1 lg:order-2">

                        <div className="bg-indigo-200/50 rounded-xl shadow-2xl h-72 sm:h-96 w-full flex items-center justify-center p-8">
                            <p className="text-indigo-800 text-xl font-medium">

                            </p>
                        </div>

                        <img
                            src="https://thumbs.dreamstime.com/b/illustration-represents-rapidly-expanding-global-e-commerce-network-connects-continents-digital-shopping-400604778.jpg"
                            alt="Global e-commerce shipping illustration"
                            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl transform rotate-3 scale-105"
                        />


                        <div className="absolute top-2/3 -left-4 sm:top-1/2 sm:-left-10 lg:top-1/4 lg:left-0">
                            <div className="bg-white p-4 rounded-lg shadow-xl border-l-4 border-yellow-500 max-w-[200px] transform rotate-[-3deg] transition duration-300 hover:rotate-0 hover:scale-105">
                                <span className="flex items-center text-sm font-bold text-gray-800">
                                    <Truck className="w-4 h-4 mr-2 text-yellow-600" />
                                    Express delivery
                                </span>
                                <span className="text-xs text-gray-500 block mt-1">3-7 business days worldwide</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 -right-4 sm:bottom-0 sm:-right-10 lg:bottom-1/4 lg:right-0">
                            <div className="bg-white p-4 rounded-lg shadow-xl border-l-4 border-green-500 max-w-[200px] transform rotate-[3deg] transition duration-300 hover:rotate-0 hover:scale-105">
                                <span className="flex items-center text-sm font-bold text-gray-800">
                                    <Zap className="w-4 h-4 mr-2 text-green-600" />
                                    Trusted by 120k+ users
                                </span>
                                <span className="text-xs text-gray-500 block mt-1">Join our growing community today!</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;