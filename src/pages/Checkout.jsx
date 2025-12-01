import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosConfig";
import { Truck, MapPin, CreditCard, ShoppingBag, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const Checkout = () => {
    const { cartItems, totals, currency, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        fullName: "",
        address: "",
        city: "",
        country: "",
        postalCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const totalUSD = totals.itemsPriceUSD || 0;
    const totalINR = totals.itemsPriceINR || 0;
    const isCartEmpty = !cartItems || cartItems.length === 0;

    const total =
        currency === "USD"
            ? `$${totalUSD.toFixed(2)}`
            : `₹${totalINR.toFixed(0)}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipping((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.username === "GuestUser") {
            setMessage("Please fill out all details to continue as a guest (or implement proper login).");
            return;
        }

        if (isCartEmpty) {
            setMessage("Your cart is empty. Please add items before checking out.");
            return;
        }
        if (Object.values(shipping).some(val => !val)) {
            setMessage("Please fill out all shipping details.");
            return;
        }

        setLoading(true);
        setMessage("Placing order...");

        try {
            await axiosClient.post("/orders", {
                orderItems: cartItems.map((item) => ({
                    product: item._id,
                    name: item.name,
                    qty: item.qty,
                    priceUSD: item.priceUSD,
                    priceINR: item.priceINR,
                    image: item.image
                })),
                shippingAddress: shipping,
                paymentMethod: "COD",
                itemsPriceUSD: totalUSD,
                itemsPriceINR: totalINR,
                totalPriceUSD: totalUSD,
                totalPriceINR: totalINR
            });

            setMessage("Order placed successfully! Redirecting to homepage...");
            clearCart();
            setTimeout(() => navigate("/"), 2000);

        } catch (error) {
            console.error("Order placement failed:", error.response ? error.response.data : error.message);
            setMessage("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
    const buttonPrimary = "w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-xl disabled:opacity-50";

    if (isCartEmpty) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h2>
                <p className="text-gray-500 mt-2">Add some products to proceed to checkout.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <CreditCard className="w-8 h-8 mr-3 text-indigo-600" /> Checkout
            </h2>

            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-center text-sm ${message.includes("successfully") ? 'bg-green-100 border border-green-400 text-green-700' :
                        message.includes("login") || message.includes("empty") || message.includes("Failed") || message.includes("fill out") ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
                        }`}
                >
                    {message.includes("successfully") ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertTriangle className="w-5 h-5 mr-2" />}
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <MapPin className="w-6 h-6 mr-2 text-indigo-500" /> Shipping Details
                    </h3>

                    <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            required
                            value={shipping.fullName}
                            onChange={handleChange}
                            className={inputClass}
                        />
                        <input
                            name="address"
                            placeholder="Street Address"
                            required
                            value={shipping.address}
                            onChange={handleChange}
                            className={inputClass}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input
                                name="city"
                                placeholder="City"
                                required
                                value={shipping.city}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="postalCode"
                                placeholder="Postal Code"
                                required
                                value={shipping.postalCode}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            <input
                                name="country"
                                placeholder="Country"
                                required
                                value={shipping.country}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 pt-4 flex items-center">
                            <CreditCard className="w-6 h-6 mr-2 text-indigo-500" /> Payment Method
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <input type="radio" name="payment" value="cod" checked readOnly className="h-4 w-4 text-indigo-600 border-gray-300" />
                                <span className="ml-3">Cash on Delivery (COD)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-20 bg-white p-6 rounded-xl shadow-2xl border border-indigo-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <ShoppingBag className="w-6 h-6 mr-2 text-indigo-600" /> Your Order
                        </h3>

                        <div className="space-y-2 border-b pb-4 mb-4 text-gray-600">
                            {cartItems.slice(0, 3).map((item) => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="truncate max-w-[70%]">{item.name} (x{item.qty})</span>
                                    <span>{currency === "USD" ? `$${(item.priceUSD * item.qty).toFixed(2)}` : `₹${(item.priceINR * item.qty).toFixed(0)}`}</span>
                                </div>
                            ))}
                            {cartItems.length > 3 && (
                                <p className="text-sm italic text-gray-500">...and {cartItems.length - 3} more items</p>
                            )}
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between font-medium text-gray-700">
                                <span>Subtotal</span>
                                <span>{total}</span>
                            </div>
                            <div className="flex justify-between font-medium text-gray-700 border-t pt-2">
                                <span>Shipping Fee</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-3 border-t-2 border-indigo-500">
                                <span>Order Total</span>
                                <span>{total}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={`${buttonPrimary} mt-6`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            ) : (
                                "Place Order Now"
                            )}
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-3">By placing your order, you agree to the Terms and Conditions.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;