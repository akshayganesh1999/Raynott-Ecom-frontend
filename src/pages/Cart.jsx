import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, currency, totals } =
        useContext(CartContext);
    const navigate = useNavigate();

    const formatPrice = (priceUSD, priceINR) => {
        if (currency === "USD") {
            return `$${priceUSD ? priceUSD.toFixed(2) : '0.00'}`;
        }
        return `₹${priceINR ? priceINR.toFixed(0) : '0'}`;
    };

    const total = formatPrice(totals.itemsPriceUSD, totals.itemsPriceINR);

    const buttonPrimary = "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-200 transform hover:-translate-y-0.5";

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">
                <ShoppingCart className="w-8 h-8 inline mr-2 text-indigo-600" />
                Your Shopping Cart
            </h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                    <p className="text-xl text-gray-600 mb-4">
                        Your cart is currently empty. Start exploring our global collection!
                    </p>
                    <Link
                        to="/products"
                        className="text-lg font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 border-b border-indigo-600 hover:border-indigo-800"
                    >
                        Go shopping now →
                    </Link>
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg"
                            >
                                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.image || '[Image of Cart Item]'}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>

                                <div className="flex-1 ml-0 sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
                                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                        {item.name}
                                    </h4>
                                    <p className="mt-1 text-base font-medium text-indigo-600">
                                        {formatPrice(item.priceUSD, item.priceINR)}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-6">
                                    <button
                                        onClick={() => updateQty(item._id, item.qty - 1)}
                                        disabled={item.qty <= 1}
                                        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) =>
                                            updateQty(item._id, Number(e.target.value))
                                        }
                                        className="w-12 text-center border border-gray-300 rounded-lg py-1 appearance-none"
                                    />
                                    <button
                                        onClick={() => updateQty(item._id, item.qty + 1)}
                                        className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="mt-4 sm:mt-0 sm:ml-6">
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition duration-150"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1 mt-10 lg:mt-0 sticky top-20 h-fit">
                        <div className="bg-white p-6 rounded-xl shadow-2xl border border-indigo-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                                Order Summary
                            </h3>

                            <div className="flex justify-between text-lg font-medium text-gray-700 py-2">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>{total}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-2xl font-extrabold text-gray-900">
                                    <span>Order Total</span>
                                    <span>{total}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className={buttonPrimary}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                            </p>

                            <Link to="/products" className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Cart;