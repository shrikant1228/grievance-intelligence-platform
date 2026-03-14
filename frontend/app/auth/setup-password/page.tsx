"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Hash, ArrowRight } from "lucide-react";

export default function SetupPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams() as any;
    const phone = searchParams?.get('phone') || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mpin, setMpin] = useState("");
    const [confirmMpin, setConfirmMpin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        if (mpin !== confirmMpin) {
            return setError("MPINs do not match");
        }
        if (mpin.length !== 4) {
            return setError("MPIN must be 4 digits");
        }

        setIsLoading(true);
        try {
            const username = searchParams?.get('username') || "Citizen";
            
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, phone, password, mpin, role: 'citizen' })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || "Failed to create account");
            }
            
            router.push("/auth/login?registered=true");
        } catch (err: any) {
            setError(err.message || "Failed to create account. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-transparent flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Secure Your Account</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Create a password and a 4-digit MPIN for quick login.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span> {error}
                    </div>
                )}

                <form onSubmit={handleSetup} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter strong password"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
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
                                    placeholder="Enter 4-digit PIN"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white font-mono"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm MPIN</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Hash className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    maxLength={4}
                                    value={confirmMpin}
                                    onChange={(e) => setConfirmMpin(e.target.value.replace(/\D/g, ''))}
                                    placeholder="Re-enter 4-digit PIN"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-white font-mono"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !password || mpin.length !== 4}
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                    >
                        {isLoading ? "Creating Account..." : "Complete Setup"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
