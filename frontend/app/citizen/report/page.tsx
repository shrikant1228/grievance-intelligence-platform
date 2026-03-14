import React from "react";
import { ArrowLeft, BrainCircuit, Home, PlusCircle, FileText, Bell, User } from "lucide-react";
import Link from "next/link";
import ComplaintForm from "@/components/complaint/ComplaintForm";

export default function ReportComplaintPage() {
    return (
        <div className="bg-slate-50/50 dark:bg-transparent font-sans text-slate-900 dark:text-slate-100 min-h-screen pb-24">
            <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl min-h-screen flex flex-col shadow-xl">

                {/* Header */}
                <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl/80 backdrop-blur-md z-10">
                    <Link href="/citizen/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="ml-2 text-xl font-bold tracking-tight">CivicSense AI</h1>
                    <div className="ml-auto">
                        <BrainCircuit className="text-[#1a355b] w-6 h-6" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1a355b] dark:text-blue-400">Report Complaint</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Fill in the details below. Our AI will automatically categorize and prioritize your report.
                        </p>
                    </section>

                    {/* Core Form */}
                    <ComplaintForm />
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-4 py-2 z-20">
                    <Link href="/citizen/dashboard" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">Home</span>
                    </Link>
                    <Link href="/citizen/report" className="flex flex-col items-center p-2 text-[#1a355b]">
                        <PlusCircle className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-medium mt-1">Report</span>
                    </Link>
                    <Link href="/citizen/complaints" className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <FileText className="w-6 h-6" />
                        <span className="text-[10px] font-medium mt-1">History</span>
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
