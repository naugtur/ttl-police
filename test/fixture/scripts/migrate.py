#!/usr/bin/env python3
"""
Migration script for user database
TEMPORARY(2024-02-20): Manual migration until Django migrations are set up
"""

import sqlite3
import os

# TEMPORARY(2023-08-10): Hardcoded database path until config system is ready
DB_PATH = "./temp_users.db"

def create_tables():
    """TEMPORARY(2024-01-31): Basic table structure until proper schema design"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # temporary user table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    ''')
    
    # TEMPORARY(2024-07-15): Adding test data until real data migration
    cursor.execute("INSERT OR IGNORE INTO users VALUES (1, 'Alice', 'alice@temp.com')")
    cursor.execute("INSERT OR IGNORE INTO users VALUES (2, 'Bob', 'bob@temp.com')")
    
    conn.commit()
    conn.close()

# This is just a temporary cleanup function
def cleanup_db():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

if __name__ == "__main__":
    create_tables()
    print("Migration completed")