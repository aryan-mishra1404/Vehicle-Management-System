"use client"

import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import sideImage from "../assets/sideImg2.webp"
import { useNavigate } from "react-router-dom"

function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login success
        localStorage.setItem("isAuthenticated", true);
        console.log("Login successful, redirecting to /vehicles...");
        navigate("/reports");
        window.dispatchEvent(new Event("storage")); // Trigger storage event manually
    };

    const fillCredentials = (email, password) => {
        setEmail(email)
        setPassword(password)
    }

    return (
        <div className="flex w-full h-screen items-start bg-secondary">
            {/* Left side - Form */}
            <div className=" flex flex-col w-full h-full justify-center items-center">
                {/* <div className="mb-12">
                    <img src="/placeholder.svg?height=40&width=150" alt="Logo" width={150} height={40} className="mb-16" />
                </div> */}

                <div className="w-[50%]">
                    <h1 className="text-3xl font-medium mb-2">Sign in</h1>
                    <p className="text-secondaryColor text-base mb-8">Enter your email and password to sign in!</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded border border-gray-300 focus:border-themeColor focus:outline-none focus:ring-1 focus:ring-themeColor"
                                required
                            />
                        </div>

                        <div className="relative space-y-1">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded border border-gray-300 focus:border-themeColor focus:outline-none focus:ring-1 focus:ring-themeColor"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 border-gray-300 rounded text-themeColor focus:ring-themeColor"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>

                            {/* <a href="#" className="text-sm text-blue-500 hover:underline">
                                Recover password
                            </a> */}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-themeColor hover:bg-blue-600 text-white rounded transition-colors"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => fillCredentials("admin@gmail.com", "admin")}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">admin@gmail.com</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">admin</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Administrator</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className=" w-full h-full relative rounded-bl-[10vmax]">
                <div className="absolute w-full h-full inset-0">
                    <img
                        src={sideImage}
                        alt="Background"

                        className="h-full rounded-bl-[10vmax]"

                    />
                </div>
                <div className="rounded-bl-[10vmax] absolute h-full inset-0 bg-black/20" />
            </div>
        </div>
    )
}

export default Login;