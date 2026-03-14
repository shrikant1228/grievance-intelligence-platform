try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.cluster import KMeans
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False

def cluster_complaints(complaints: list[dict], num_clusters: int = 3) -> dict:
    """
    Clusters complaints into groups using K-Means.
    Expects dicts with 'complaint_text' and 'id'.
    """
    if not ML_AVAILABLE or len(complaints) < num_clusters:
        return {"1": [c.get("id") for c in complaints]}

    texts = [c.get("complaint_text", c.get("text", "")) for c in complaints]
    ids = [c.get("id") for c in complaints]
    
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(texts)
    
    kmeans = KMeans(n_clusters=num_clusters, random_state=42)
    kmeans.fit(X)
    
    clusters = {}
    for i, label in enumerate(kmeans.labels_):
        cluster_id = str(label + 1)
        if cluster_id not in clusters:
            clusters[cluster_id] = []
        clusters[cluster_id].append(ids[i])
        
    return clusters
