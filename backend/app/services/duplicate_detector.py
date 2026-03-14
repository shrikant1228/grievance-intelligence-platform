try:
    from sentence_transformers import SentenceTransformer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False

_model = None

def get_model():
    global _model
    if not AI_AVAILABLE:
        return None
    if _model is None:
        print("Lazy loading SentenceTransformer model...")
        _model = SentenceTransformer("all-MiniLM-L6-v2")
        print("Model loaded.")
    return _model

def is_duplicate(new_text: str, existing_texts: list[str]) -> tuple[bool, float, int]:
    """
    Checks if new_text is a duplicate of any existing_texts.
    Returns: (is_duplicate, score, matching_index)
    """
    model = get_model()
    if not model or not existing_texts:
        return False, 0.0, -1
        
    new_embedding = model.encode([new_text])
    existing_embeddings = model.encode(existing_texts)
    
    similarity_scores = cosine_similarity(new_embedding, existing_embeddings)[0]
    
    if len(similarity_scores) == 0:
        return False, 0.0, -1
        
    max_score = float(similarity_scores.max())
    max_index = int(np.argmax(similarity_scores))
    
    if max_score > 0.85:
        return True, max_score, max_index
        
    return False, max_score, -1
