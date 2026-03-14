"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Files,
    Building2,
    MapPin,
    Map,
    BrainCircuit,
    Users,
    Settings,
    LogOut
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "All Complaints", href: "/admin/complaints", icon: Files },
        { name: "Departments", href: "/admin/departments", icon: Building2 },
        { name: "Ward Analytics", href: "/admin/ward-analytics", icon: MapPin },
        { name: "Hotspot Map", href: "/admin/hotspot-map", icon: Map },
        { name: "AI Insights", href: "/admin/ai-insights", icon: BrainCircuit },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white tracking-tight">CivicSense AI</h2>
                <p className="text-sm text-slate-400 mt-1">Admin Intelligence</p>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto pb-4">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-purple-600/10 text-purple-400 font-semibold"
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
