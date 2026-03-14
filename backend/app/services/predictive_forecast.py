import pandas as pd
from datetime import datetime

def forecast_complaints(complaints):
    """
    Analyzes historical complaint patterns and predicts future civic issue spikes.
    Returns early predictive alerts for Admin AI Insights panel.
    """
    if not complaints:
        return []

    df = pd.DataFrame(complaints)
    
    if "created_at" not in df.columns or "ward" not in df.columns or df.empty:
        return []

    # Handle missing departments natively
    if "department" not in df.columns:
        df["department"] = "General"

    # Convert safely to datetime
    df["created_at"] = pd.to_datetime(df["created_at"], errors='coerce')
    df = df.dropna(subset=["created_at"])
    df["day"] = df["created_at"].dt.date

    # Group by ward, department, and day
    grouped = df.groupby(["ward", "department", "day"]).size().reset_index(name="count")

    predictions = []

    for ward in grouped["ward"].unique():
        for dept in grouped[grouped["ward"] == ward]["department"].unique():
            # Filter specifically by ward/dept pair
            filtered_data = grouped[(grouped["ward"] == ward) & (grouped["department"] == dept)]
            
            # Simple Time-Series prediction finding the mean across trailing days available
            recent_avg = filtered_data["count"].tail(7).mean()
            
            # Predict only if volume suggests a spike or statistically significant flow
            # (threshold artificially low for hackathon visibility)
            if recent_avg > 0: 
                # Mathematical simplistic scaling assuming standard 20% spike momentum
                predicted_volume = int(recent_avg * 7 * 1.2)
                
                # Assign a severity trend
                trend = "rising" if predicted_volume > 15 else ("moderate increase" if predicted_volume > 5 else "stable")
                
                if trend != "stable":
                    predictions.append({
                        "ward": ward,
                        "department": dept,
                        "trend": trend,
                        "predicted_complaints_next_week": predicted_volume
                    })

    # Sort to show highest predicted volume first
    predictions.sort(key=lambda x: x["predicted_complaints_next_week"], reverse=True)
    return predictions[:10] # Return top 10 forecasts
