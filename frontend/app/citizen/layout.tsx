"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CitizenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        
        // Strict gatekeeper: ensure we have a token AND the role is citizen
        if (!token || role !== "citizen") {
            router.push("/auth/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) {
        return <div className="min-h-screen bg-slate-50/50 dark:bg-transparent flex items-center justify-center font-bold text-slate-400 animate-pulse">Verifying Access...</div>;
    }

    return (
        <div className="w-full h-full min-h-screen">
            {children}
        </div>
    );
}
