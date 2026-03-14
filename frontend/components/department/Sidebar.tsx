"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ClipboardList,
    Map,
    AlertTriangle,
    CheckCircle,
    BarChart3,
    LogOut
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Dashboard", href: "/department/dashboard", icon: LayoutDashboard },
        { name: "Assigned Complaints", href: "/department/assigned", icon: ClipboardList },
        { name: "Ward View", href: "/department/ward-view", icon: Map },
        { name: "Priority Alerts", href: "/department/priority-alerts", icon: AlertTriangle },
        { name: "Resolved", href: "/department/resolved", icon: CheckCircle },
        { name: "Performance", href: "/department/performance", icon: BarChart3 },
    ];

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white tracking-tight">CivicSense AI</h2>
                <p className="text-sm text-slate-400 mt-1">Officer Portal</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-blue-600/10 text-blue-500 font-semibold"
                                    : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button 
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("username");
                        localStorage.removeItem("userRole");
                        window.location.href = "/auth/login";
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
