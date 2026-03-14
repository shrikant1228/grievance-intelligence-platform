"use client";

import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import LocationSelector from "./LocationSelector";
import AIInsightsCard from "./AIInsightsCard";
import { useRouter } from "next/navigation";
import { AlertTriangle, ThumbsUp } from "lucide-react";

export default function ComplaintForm() {
    const router = useRouter();

    const [complaintText, setComplaintText] = useState("");
    const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [department, setDepartment] = useState<string | null>(null);
    const [priority, setPriority] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number | null>(null);

    // Duplicate & Upvote State
    const [duplicateId, setDuplicateId] = useState<string | null>(null);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpvoting, setIsUpvoting] = useState(false);

    const handleAnalyze = async () => {
        if (!complaintText && !evidenceFile) {
            alert("Please provide a description or an image before analyzing.");
            return;
        }

        setIsAnalyzing(true);
        setIsDuplicate(false);
        setDuplicateId(null);
        try {
            let finalText = complaintText;
            
            // 1. Analyze Image first if present
            if (evidenceFile) {
                const formData = new FormData();
                formData.append("file", evidenceFile);
                
                const imageRes = await fetch('http://localhost:8000/api/ai/analyze-image', {
                    method: 'POST',
                    body: formData
                });
                
                if (imageRes.ok) {
                    const imageData = await imageRes.json();
                    if (imageData.detected_issue) {
                        finalText = finalText ? `${finalText}. Detected from image: ${imageData.detected_issue}` : `Detected from image: ${imageData.detected_issue}`;
                        // Optional: update the textbox for the user to see
                        setComplaintText(finalText);
                    }
                }
            }
            
            // 2. First check for duplicates with the combined text
            const dupRes = await fetch('http://localhost:8000/api/ai/check-duplicate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complaint_text: finalText })
            });

            if (dupRes.ok) {
                const dupData = await dupRes.json();
                if (dupData.duplicate && dupData.similar_complaint_id) {
                    setIsDuplicate(true);
                    setDuplicateId(dupData.similar_complaint_id);
                }
            }

            // 3. Then standard analysis
            const response = await fetch('http://localhost:8000/api/analyze-complaint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complaint_text: finalText })
            });

            const data = await response.json();

            setDepartment(data.department);
            setPriority(data.priority);
            setConfidence(data.confidence);

        } catch (error) {
            console.error("Analysis failed", error);
            alert("Failed to analyze complaint. Please ensure the backend is running.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleUpvote = async () => {
        if (!duplicateId) return;
        setIsUpvoting(true);
        try {
            const response = await fetch(`http://localhost:8000/api/complaints/${duplicateId}/upvote`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error("Failed to upvote");
            }

            alert("Thank you! You have successfully upvoted/supported this existing issue.");
            router.push("/citizen/dashboard");
        } catch (error) {
            console.error("Upvote failed", error);
            alert("Failed to Upvote complaint. Please try again.");
        } finally {
            setIsUpvoting(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!complaintText || !department) {
            alert("Please provide a description and analyze the complaint before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Mock file upload to Supabase storage 'complaint-images'
            let image_url = null;
            if (evidenceFile) {
                image_url = "https://supabase.storage/complaint-images/image1.jpg";
            }

            const user_id = localStorage.getItem("user_id") || "anonymous";

            const payload = {
                user_id,
                complaint_text: complaintText,
                latitude: latitude || 0,
                longitude: longitude || 0,
                department,
                priority,
                image_url
            };

            const response = await fetch('http://localhost:8000/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || "Failed to submit complaint");
            }

            alert("Complaint submitted successfully!");
            router.push("/citizen/dashboard");

        } catch (error: any) {
            console.error("Submission failed", error);
            alert(`Failed to submit complaint: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <section className="space-y-3">
                <label className="block">
                    <span className="text-sm font-semibold mb-2 block">Complaint Description</span>
                    <textarea
                        value={complaintText}
                        onChange={(e) => setComplaintText(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-[#1a355b] focus:border-[#1a355b] min-h-[120px] p-4 text-sm transition-all outline-none"
                        placeholder="Describe the issue (e.g., 'Broken streetlight on Main St causing safety concerns at night')"
                        required
                    />
                </label>
            </section>

            <ImageUploader
                evidenceFile={evidenceFile}
                setEvidenceFile={setEvidenceFile}
            />

            <LocationSelector
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
            />

            <AIInsightsCard
                complaintText={complaintText}
                department={department}
                priority={priority}
                confidence={confidence}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
            />

            {isDuplicate && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-amber-800 dark:text-amber-400 font-bold text-sm">Similar Issue Already Reported</h4>
                            <p className="text-amber-700 dark:text-amber-500/80 text-xs mt-1 leading-relaxed">
                                Our AI detected that <strong>14 citizens</strong> have recently reported a nearly identical issue matching your description.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleUpvote}
                        disabled={isUpvoting}
                        className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <ThumbsUp className="w-4 h-4" />
                        {isUpvoting ? "Recording Vote..." : "Support This Existing Complaint"}
                    </button>
                    <p className="text-center text-[10px] text-amber-600/60 mt-2 font-medium">Supporting existing issues boosts its priority in Department workflows and speeds up resolution.</p>
                </div>
            )}

            <section className="flex flex-col gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting || !department}
                    className="w-full bg-[#1a355b] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#1a355b]/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "Submitting..." : (isDuplicate ? "Submit Duplicate Anyway" : "Submit Complaint")}
                </button>
                <button
                    type="button"
                    onClick={() => router.push("/citizen/dashboard")}
                    className="w-full bg-transparent text-slate-500 dark:text-slate-400 py-3 font-medium hover:text-red-500 transition-colors"
                >
                    Cancel and Discard
                </button>
            </section>
        </form>
    );
}
