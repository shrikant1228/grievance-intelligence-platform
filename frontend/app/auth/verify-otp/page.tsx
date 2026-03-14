"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound } from "lucide-react";

export default function VerifyOTPPage() {
    const searchParams = useSearchParams() as any;
    const phone = searchParams?.get('phone') || "";
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length < 6) return;

        setIsLoading(true);
        try {
            // Mock API verify-otp
            setTimeout(() => {
                router.push(`/auth/setup-password?phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(searchParams?.get('username') || '')}`);
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
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Verify Identity</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        We sent a 6-digit code to <br /><strong className="text-slate-700 dark:text-slate-300">{phone}</strong>
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8">
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => { inputRefs.current[index] = el }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white"
                                required
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otp.join("").length < 6}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
