from pymongo import MongoClient
import os

# Connect to local MongoDB instance
client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
db = client["civicsense"]

# Expose collections
complaints_collection = db["complaints"]
users_collection = db["users"]
