import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../api/axiosConfig";
import CategoryStrip from "../components/CategoryStrip";
import ProductCard from "../components/ProductCard";
import { Search, Loader2 } from 'lucide-react';

const Products = () => {
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const buttonPrimary = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-200 flex items-center justify-center min-w-[100px]";

    const fetchProducts = useCallback(() => {
        setIsLoading(true);
        const params = {};
        if (category && category !== "All") params.category = category;
        if (search) params.search = search;

        axiosClient
            .get("/products", { params })
            .then((res) => setProducts(res.data))
            .catch(() => {
                setProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [category, search]);

    useEffect(() => {
        fetchProducts();
    }, [category, fetchProducts]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    const LoadingCard = () => (
        <div className="bg-white rounded-xl shadow-lg animate-pulse p-4">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-indigo-200 rounded w-full"></div>
        </div>
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-gray-900">
                    Shop All Products
                </h2>
                <p className="mt-2 text-xl text-gray-500">
                    Explore our complete international catalog.
                </p>
            </div>

            <div className="mb-10 sticky top-16 bg-white z-20 pt-4 pb-4 border-b border-gray-200">

                <CategoryStrip
                    active={category || "All"}
                    onChange={(cat) => setCategory(cat)}
                />

                <form className="mt-4 flex shadow-md rounded-lg max-w-lg mx-auto" onSubmit={handleSearch}>
                    <input
                        placeholder="Search products, brands..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                    <button type="submit" className={buttonPrimary}>
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Search className="w-5 h-5 mr-1" />
                        )}
                        Search
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">

                {isLoading ? (
                    [...Array(8)].map((_, i) => <LoadingCard key={i} />)
                ) : products.length > 0 ? (
                    products.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl">
                        <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-xl font-medium text-gray-600">
                            No products found for the current filter/search.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Products;