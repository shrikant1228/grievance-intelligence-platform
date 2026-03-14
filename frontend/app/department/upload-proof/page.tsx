"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, UploadCloud, Camera } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UploadProofPage() {
    const router = useRouter();
    const searchParams = useSearchParams() as any;
    const id = searchParams?.get('id') || "CIV-1032";

    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setEvidenceFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!evidenceFile) return;
        setIsUploading(true);

        try {
            // Mock Supabase storage upload to 'resolution-images' bucket
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Mock db update `complaints.after_image`
            alert("Resolution image uploaded successfully!");
            router.push(`/department/complaint-detail?id=${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Upload Resolution Proof</h1>
                    <p className="text-sm text-slate-500">Complaint {id}</p>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <Camera className="text-blue-600 w-8 h-8" />
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">
                        {evidenceFile ? evidenceFile.name : "Click to attach image"}
                    </p>
                    {!evidenceFile && <p className="text-sm text-slate-500 mt-2">JPG, PNG up to 10MB</p>}
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!evidenceFile || isUploading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <UploadCloud className="w-5 h-5" />
                    {isUploading ? "Uploading..." : "Upload & Save Proof"}
                </button>
            </div>
        </div>
    );
}
