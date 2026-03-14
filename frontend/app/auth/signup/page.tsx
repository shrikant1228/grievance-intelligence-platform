"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, ArrowRight } from "lucide-react";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mock API call
            // await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
            setTimeout(() => {
                router.push(`/auth/verify-otp?phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(username)}`);
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-transparent flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">CivicSense AI</h1>
                    <p className="text-slate-500 dark:text-slate-400">Join to report and track civic issues</p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium"
                                required
                            />
                        </div>
                    </div>

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
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || phone.length < 10 || username.trim() === ""}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
