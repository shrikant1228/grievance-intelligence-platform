"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Smartphone, Hash, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams() as any;
    const isRegistered = searchParams?.get('registered');

    const [phone, setPhone] = useState("");
    const [mpin, setMpin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, mpin })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Authentication failed");
            }

            // In real Next.js, store JWT in HTTP-Only cookie via an API route handler,
            // but for this MVP mock, we'll store role in localStorage to bypass and route.
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("username", data.username);
            if (data.phone) localStorage.setItem("phone", data.phone);

            // Route based on role
            if (data.role === 'admin') router.push('/admin/dashboard');
            else if (data.role === 'department') router.push('/department/dashboard');
            else router.push('/citizen/dashboard');

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Invalid credentials");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-transparent flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">

                {isRegistered && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm font-semibold border border-green-200 flex items-center justify-center gap-2 animate-pulse">
                        <ShieldCheck className="w-5 h-5" /> Account created successfully! Please login.
                    </div>
                )}

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400">Login with your Phone and MPIN</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-200 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Smartphone className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter 10-digit number"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">4-Digit MPIN</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Hash className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    maxLength={4}
                                    value={mpin}
                                    onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
                                    placeholder="Enter your PIN"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white font-mono"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || phone.length < 10 || mpin.length !== 4}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                    >
                        {isLoading ? "Authenticating..." : "Login Securely"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                        Sign up now
                    </Link>
                </p>
            </div>
        </div>
    );
}
