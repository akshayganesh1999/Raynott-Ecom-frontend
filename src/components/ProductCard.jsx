import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Zap } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart, currency } = useContext(CartContext);
    const [isHovered, setIsHovered] = useState(false);

    const formattedPrice =
        currency === "USD"
            ? `$${product.priceUSD?.toFixed(2) || '0.00'}`
            : `₹${product.priceINR?.toFixed(0) || '0'}`;

    const PriceDisplay = () => (
        <div className="flex items-center justify-between mt-1 mb-3">
            <p className="text-xl font-bold text-gray-900">
                {formattedPrice}
            </p>
            {product.isFeatured && (
                <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                    <Zap className="w-3 h-3 mr-1" /> Featured
                </span>
            )}
            {product.inStock < 5 && product.inStock > 0 && (
                <span className="text-xs font-semibold text-red-600">
                    {product.inStock} left!
                </span>
            )}
        </div>
    );

    const buttonClass = "w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md";

    return (
        <div
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden 
                       transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/products/${product._id}`} className="block relative h-48 sm:h-56">
                <img
                    src={product.image || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition duration-500 hover:opacity-90"
                />
            </Link>

            <div className="p-4 flex flex-col justify-between h-auto">
                <div>
                    <Link to={`/products/${product._id}`} className="group">
                        <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition duration-150 truncate">
                            {product.name}
                        </h4>
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5 capitalize">
                        {product.brand || product.category || 'Generic'}
                    </p>

                    <PriceDisplay />
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className={buttonClass}
                    title="Add to Cart"
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
