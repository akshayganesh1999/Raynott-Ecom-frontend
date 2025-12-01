import React, { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prev) => {
            const exists = prev.find((p) => p._id === product._id);
            if (exists) {
                return prev.map((p) =>
                    p._id === product._id ? { ...p, qty: p.qty + qty } : p
                );
            }
            return [...prev, { ...product, qty }];
        });
    };

    const removeFromCart = (id) =>
        setCartItems((prev) => prev.filter((p) => p._id !== id));

    const updateQty = (id, qty) =>
        setCartItems((prev) =>
            prev.map((p) => (p._id === id ? { ...p, qty } : p))
        );

    const clearCart = () => setCartItems([]);

    const totals = useMemo(() => {
        const itemsPriceUSD = cartItems.reduce(
            (acc, item) => acc + item.priceUSD * item.qty,
            0
        );
        const itemsPriceINR = cartItems.reduce(
            (acc, item) => acc + item.priceINR * item.qty,
            0
        );
        return { itemsPriceUSD, itemsPriceINR };
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQty,
                currency,
                setCurrency,
                totals,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;