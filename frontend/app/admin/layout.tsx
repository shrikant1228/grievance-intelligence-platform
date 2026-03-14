"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        if (!token || role !== "admin") {
            router.push("/auth/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    // Prevent rendering the dashboard until authorized
    if (!isAuthorized) {
        return <div className="min-h-screen bg-slate-50/50 dark:bg-transparent flex items-center justify-center font-bold text-slate-400 animate-pulse">Verifying Access...</div>;
    }

    return (
        <div className="flex h-screen w-full bg-slate-50/50 dark:bg-transparent font-sans overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
