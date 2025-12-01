/**
 * @file Database connection utilities
 * TEMPORARY(2024-01-22): Basic connection pool until production database is configured
 */

const mysql = require('mysql2');

// TEMPORARY(2023-03-10): Hardcoded connection settings until environment config
const connectionConfig = {
  host: 'localhost',
  user: 'dev',
  password: 'temp123',
  database: 'userdb_temp'
};

// temporary connection pool
const pool = mysql.createPool(connectionConfig);

/**
 * TEMPORARY(2024-08-01): Synchronous queries until async/await refactor
 */
function executeQuery(sql, params) {
  // This is just a temporary implementation
  return pool.execute(sql, params);
}

// TEMPORARY(2023-12-15): Basic error handling until proper logging framework
function handleDbError(error) {
  console.error('DB Error:', error);
  throw error;
}

module.exports = { executeQuery, handleDbError };