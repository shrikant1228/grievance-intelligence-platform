import uvicorn
import os
from dotenv import load_dotenv

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Run the FastAPI application using Uvicorn
    # The application instance is 'app' inside 'app.main'
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
