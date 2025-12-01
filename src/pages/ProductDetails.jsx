import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosConfig.js";
import { CartContext } from "../context/CartContext.jsx";
import { Loader2, ShoppingCart, Tag, DollarSign, Clock, CheckCircle } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, currency } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        setMsg('');
        try {
            const res = await axiosClient.get(`/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
            setProduct(null);
            setMsg("Product not found or failed to load.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto py-20 text-center">
                <Loader2 className="w-8 h-8 mx-auto text-indigo-600 animate-spin" />
                <p className="mt-4 text-gray-600">Loading product details...</p>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="max-w-6xl mx-auto py-20 text-center">
                <p className="text-xl font-semibold text-red-600">{msg}</p>
            </main>
        );
    }

    const price =
        currency === "USD"
            ? `$${product.priceUSD?.toFixed(2) || '0.00'}`
            : `₹${product.priceINR?.toFixed(0) || '0'}`;

    const inStock = product.stockCount > 0;
    const stockMessage = inStock ?
        <span className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> In Stock ({product.stockCount})</span> :
        <span className="text-red-600 font-medium flex items-center"><Clock className="w-4 h-4 mr-1" /> Out of Stock</span>;

    const handleAddToCart = () => {
        if (!inStock) {
            setMsg("This item is currently out of stock.");
            setTimeout(() => setMsg(''), 3000);
            return;
        }
        addToCart(product);
        setMsg(`${product.name} added to cart!`);
        setTimeout(() => setMsg(''), 2000);
    }

    const buttonClass = "w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-xl disabled:opacity-50";

    return (
        <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-2xl">

                <div className="lg:col-span-1">
                    <img
                        src={product.image || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        className="w-full h-auto object-cover object-center rounded-xl shadow-lg border border-gray-100"
                    />
                </div>

                <div className="lg:col-span-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-extrabold text-gray-900">{product.name}</h2>
                        <p className="text-lg text-gray-500 flex items-center">
                            <Tag className="w-5 h-5 mr-2" /> Category: {product.category || product.brand || 'General'}
                        </p>

                        <div className="border-t border-b py-4 my-4">
                            <p className="text-5xl font-bold text-gray-900 flex items-center">
                                <DollarSign className="w-8 h-8 mr-2 text-green-600" />
                                {price}
                            </p>
                        </div>

                        <p className="text-base">
                            {stockMessage}
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 pt-4">About this product</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {product.description}
                        </p>

                        {msg && (
                            <p className={`p-2 rounded text-sm ${msg.includes("added") ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {msg}
                            </p>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleAddToCart}
                            className={buttonClass}
                            disabled={!inStock}
                        >
                            <ShoppingCart className="w-6 h-6 mr-2" />
                            {inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;