"use client";

import React, { useRef } from "react";
import { Camera } from "lucide-react";

interface ImageUploaderProps {
  evidenceFile: File | null;
  setEvidenceFile: (file: File | null) => void;
}

export default function ImageUploader({ evidenceFile, setEvidenceFile }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  return (
    <section className="space-y-3">
      <span className="text-sm font-semibold block">Evidence (Optional)</span>
      <div 
        className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, video/mp4" 
          onChange={handleFileChange}
        />
        <div className="bg-[#1a355b]/10 dark:bg-[#1a355b]/30 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
          <Camera className="text-[#1a355b] w-6 h-6" />
        </div>
        <p className="text-sm font-medium">
          {evidenceFile ? evidenceFile.name : "Upload Image or Video"}
        </p>
        {!evidenceFile && <p className="text-xs text-slate-400 mt-1">PNG, JPG or MP4 up to 10MB</p>}
      </div>
    </section>
  );
}
