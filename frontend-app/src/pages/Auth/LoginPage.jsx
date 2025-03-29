import { useState } from "react";
import { loginUser } from "../../services/Auth.service";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await loginUser(formData.email, formData.password);
            if (response?.token) {
                alert("Login berhasil!");
                navigate("/products");
            } else {
                setError("Login gagal, periksa kembali data Anda.");
            }
        } catch (err) {
            setError(err.message || "Gagal login, periksa kembali data Anda.");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <header className="w-full flex justify-between items-center px-28 py-4 border-b">
                <div className="text-orange-600 text-xl font-bold flex items-center">
                    <span className="text-2xl">🛍</span> Shopymad <span className="ml-2 text-gray-600">Log in</span>
                </div>
                <a href="#" className="text-red-500 text-sm">Butuh bantuan?</a>
            </header>
            <div className="flex flex-1">
                <div className="hidden md:flex w-1/2 bg-orange-500 text-white flex-col justify-center items-center p-10">
                    <div className="text-center">
                        <div className="text-6xl font-bold">🛍</div>
                        <h1 className="text-4xl font-bold mt-4">Shopymad</h1>
                        <p className="mt-4 text-lg">Tempat Belanja Online No. 1 di Asia Tenggara dan Indonesia</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Log in</h2>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                                required
                            />
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Password" 
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                                required
                            />
                            <button 
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
                            >
                                LOG IN
                            </button>
                        </form>
                        <div className="text-right mt-2">
                            <a href="#" className="text-blue-500 text-sm">Lupa Password?</a>
                        </div>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-2 text-gray-500">ATAU</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <div className="flex space-x-4">
                            <button className="w-1/2 flex items-center justify-center border py-2 rounded-lg font-medium">
                                <span className="mr-2">🔵</span> Facebook
                            </button>
                            <button className="w-1/2 flex items-center justify-center border py-2 rounded-lg font-medium">
                                <span className="mr-2">🔴</span> Google
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Baru di Shopee? <Link to="/register" className="text-orange-500 font-semibold">Daftar</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
