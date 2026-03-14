"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/department/Sidebar";
import Navbar from "@/components/department/Navbar";
import { useRouter } from "next/navigation";

export default function DepartmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        
        if (!token || (role !== "admin" && role !== "department")) {
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
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
