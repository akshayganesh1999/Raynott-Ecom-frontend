import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosConfig";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("raynott_user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (data) => {
        localStorage.setItem("raynott_token", data.token);
        localStorage.setItem("raynott_user", JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("raynott_token");
        localStorage.removeItem("raynott_user");
        setUser(null);
    };

    const fetchProfile = () =>
        axiosClient
            .get("/auth/profile")
            .then((res) => setUser(res.data))
            .catch(() => { });

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
