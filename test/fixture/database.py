"""
Database utility module
"""
import sqlite3
from datetime import datetime

class DatabaseManager:
    def __init__(self, db_path):
        # TEMPORARY(2024-01-15): Hardcoded path until config system is ready
        self.connection = sqlite3.connect(db_path or "/tmp/test.db")
        
    def execute_query(self, query):
        """Execute a database query"""
        # temporary logging for debugging
        print(f"Executing: {query}")
        
        # TEMPORARY(2023-06-01): Using synchronous queries, need to implement async
        cursor = self.connection.cursor()
        return cursor.execute(query)
    
    # TEMPORARY(2024-12-01): This method needs proper error handling
    def get_users(self):
        return self.execute_query("SELECT * FROM users")

# This is just a temporary solution
def legacy_function():
    pass