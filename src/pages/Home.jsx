import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Star, TrendingUp } from 'lucide-react';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosClient
            .get("/products/featured")
            .then((res) => {
                setFeatured(res.data);
            })
            .catch(() => {
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const LoadingCard = () => (
        <div className="bg-white rounded-xl shadow-lg animate-pulse p-4">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-indigo-200 rounded w-full"></div>
        </div>
    );

    return (
        <main>
            <Hero />

            <section id="featured" className="py-12 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 mr-1" /> Top Picks
                        </p>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Featured Globally
                        </h2>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Hand-selected, high-demand items from our international partners.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">

                        {isLoading ? (
                            [...Array(5)].map((_, i) => <LoadingCard key={i} />)
                        ) : (
                            featured.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))
                        )}

                        {!isLoading && featured.length === 0 && (
                            <div className="col-span-full text-center py-10">
                                <Star className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
                                <p className="text-lg text-gray-600">No featured products available right now. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;