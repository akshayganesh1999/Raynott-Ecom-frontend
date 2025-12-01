import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosConfig";
import {
    Package,
    DollarSign,
    Tag,
    Hash,
    Image as ImageIcon,
    CheckCircle,
    AlertTriangle,
    Loader2
} from "lucide-react";

const emptyProduct = {
    name: "",
    description: "",
    priceUSD: "",
    priceINR: "",
    category: "",
    inStock: "",
    isFeatured: false,
    image: ""
};

const AdminProductForm = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(emptyProduct);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const inputClass =
        "w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
    const buttonPrimary =
        "w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg disabled:opacity-50";

    useEffect(() => {
        if (!isEdit) return;
        setIsLoading(true);

        axiosClient
            .get(`/products/${id}`)
            .then((res) => {
                setProduct({
                    name: res.data.name || "",
                    description: res.data.description || "",
                    priceUSD: res.data.priceUSD || "",
                    priceINR: res.data.priceINR || "",
                    category: res.data.category || "",
                    inStock: res.data.inStock || "",
                    isFeatured: res.data.isFeatured || false,
                    image: res.data.image || ""
                });
                setPreviewImage(res.data.image);
                setMsg("");
            })
            .catch(() => {
                setMsg("Failed to load product data.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, isEdit]);

    const handleChange = (field, value) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg("Saving...");

        const fd = new FormData();
        Object.entries(product).forEach(([k, v]) => fd.append(k, v));
        if (imageFile) fd.append("image", imageFile);

        const method = isEdit ? "put" : "post";
        const url = isEdit ? `/products/${id}` : "/products";

        axiosClient[method](url, fd, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(() => {
                setMsg("Product saved successfully!");
                setTimeout(() => navigate("/admin/products"), 1500);
            })
            .catch((err) => {
                const message =
                    err.response?.data?.message ||
                    "Save failed. Please check your inputs.";
                setMsg(message);
                setTimeout(() => setMsg(""), 5000);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                <div className="mb-8 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                        <Package className="w-7 h-7 mr-3 text-indigo-600" />
                        {isEdit ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-gray-500">
                        Manage product details and inventory for global sales.
                    </p>
                </div>

                {msg && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center text-sm ${msg.includes("successfully")
                                ? "bg-green-100 border border-green-400 text-green-700"
                                : "bg-yellow-100 border border-yellow-400 text-yellow-700"
                            }`}
                    >
                        {msg.includes("successfully") ? (
                            <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 mr-2" />
                        )}
                        {msg}
                    </div>
                )}

                {isEdit && isLoading && (
                    <div className="flex items-center text-indigo-600 py-10 justify-center">
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        <span className="text-lg font-medium">
                            Loading product data...
                        </span>
                    </div>
                )}

                {!isEdit || !isLoading ? (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <Tag className="w-5 h-5 mr-2 text-indigo-500" />
                                Basic Details
                            </h3>
                            <input
                                placeholder="Product Name"
                                value={product.name}
                                required
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                className={inputClass}
                            />
                            <textarea
                                placeholder="Product Description"
                                value={product.description}
                                required
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                                rows={4}
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                                Pricing
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Price in USD"
                                    type="number"
                                    required
                                    value={product.priceUSD}
                                    onChange={(e) =>
                                        handleChange(
                                            "priceUSD",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                />
                                <input
                                    placeholder="Price in INR"
                                    type="number"
                                    required
                                    value={product.priceINR}
                                    onChange={(e) =>
                                        handleChange(
                                            "priceINR",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <Hash className="w-5 h-5 mr-2 text-purple-500" />
                                Inventory & Classification
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Category (e.g., Electronics)"
                                    required
                                    value={product.category}
                                    onChange={(e) =>
                                        handleChange(
                                            "category",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                />
                                <input
                                    placeholder="Stock Quantity"
                                    type="number"
                                    required
                                    value={product.inStock}
                                    onChange={(e) =>
                                        handleChange(
                                            "inStock",
                                            e.target.value
                                        )
                                    }
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Product Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />

                            {previewImage && (
                                <div className="mt-4">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-lg border"
                                    />
                                </div>
                            )}

                            <label className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    checked={product.isFeatured}
                                    onChange={(e) =>
                                        handleChange(
                                            "isFeatured",
                                            e.target.checked
                                        )
                                    }
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Feature on Homepage
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={buttonPrimary}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            ) : isEdit ? (
                                "Update Product"
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </form>
                ) : null}
            </div>
        </main>
    );
};

export default AdminProductForm;
