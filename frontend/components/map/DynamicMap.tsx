"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { MapPin } from "lucide-react";

export default function DynamicMap() {
    const [complaints, setComplaints] = useState<any[]>([]);

    useEffect(() => {
        // We could fetch ALL complaints or a specific area's complaints
        // For this demo, let's fetch the current user's just to show markers, or all if we had an "all" endpoint.
        // Let's assume there is a way to get issues near you.
        const fetchIssues = async () => {
            try {
                // To show general map markers, we could hit the intelligence routes or simply just drop some dummy markers 
                // but let's try to get my complaints as an example of markers for now.
                const userId = localStorage.getItem("user_id");
                if (!userId) return;

                const res = await fetch(`http://localhost:8000/api/citizen/my-complaints?user_id=${userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComplaints(data.complaints || []);
                }
            } catch (err) {
                console.error("Failed to load map markers", err);
            }
        };

        fetchIssues();
    }, []);

    // Bangalore default center
    const defaultCenter = [12.9716, 77.5946];

    return (
        <MapContainer 
            center={defaultCenter as any} 
            zoom={13} 
            style={{ width: '100%', height: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {complaints.map((c) => {
                // If the backend returned actual lat/lng, we'd use them. 
                // For this MVP, let's randomly jitter them around Bangalore center if they don't have location
                const lat = 12.9716 + (Math.random() - 0.5) * 0.05;
                const lng = 77.5946 + (Math.random() - 0.5) * 0.05;
                
                return (
                    <Marker position={[lat, lng]} key={c.id}>
                        <Popup>
                            <strong>{c.complaint_text}</strong><br/>
                            Status: {c.status}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
