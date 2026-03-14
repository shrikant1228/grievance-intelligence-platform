"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Home, PlusCircle, FileText, Bell, User, ArrowLeft, MapPin } from "lucide-react";

const InteractiveMap = dynamic(() => import("../../../components/map/DynamicMap"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold">Loading Interactive Map...</div>
});

export default function CitizenMapPage() {
    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md sticky top-0 z-10 z-20">
                    <Link href="/citizen/dashboard" className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors mr-2">
                        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Issues Near You</h1>
                </header>

                <main className="flex-1 relative bg-slate-200 dark:bg-slate-800 flex flex-col">
                    <div className="flex-1 w-full h-full relative" style={{ minHeight: '60vh' }}>
                        <InteractiveMap />
                    </div>

                    <div className="absolute bottom-6 left-4 right-4 bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-[1000]">
                        <div className="flex gap-3">
                            <div className="bg-red-100 dark:bg-red-900/50 p-2 text-red-600 dark:text-red-400 rounded-lg shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Broken Streetlight</h3>
                                <p className="text-xs text-slate-500 font-medium mt-1">200m away • Reported 2 days ago</p>
                                <button className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded disabled opacity-50">Already Reported</button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-4 py-2 z-30">
                    <Link href="/citizen/dashboard" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Home</span>
                    </Link>
                    <Link href="/citizen/report" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <PlusCircle className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Report</span>
                    </Link>
                    <Link href="/citizen/map" className="flex flex-col items-center p-2 text-[#1a355b] dark:text-blue-400">
                        <MapPin className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold mt-1">Map</span>
                    </Link>
                    <Link href="/citizen/notifications" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Alerts</span>
                    </Link>
                    <Link href="/citizen/profile" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Profile</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
