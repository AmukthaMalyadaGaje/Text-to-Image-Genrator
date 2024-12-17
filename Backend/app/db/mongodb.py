from pymongo import MongoClient

# Database Connection
client = MongoClient("mongodb://localhost:27017")  # Replace with your MongoDB URI
db = client["MiniProject"]  # Replace with your database name
users_collection = db["users"]  # Users collection in the database
