<?php
// API Gateway for user management
// TEMPORARY(2024-01-05): Using basic auth until OAuth2 is implemented

class UserAPI {
    private $users;
    
    public function __construct() {
        // temporary hardcoded users
        $this->users = [
            1 => ['name' => 'Alice', 'email' => 'alice@example.com'],
            2 => ['name' => 'Bob', 'email' => 'bob@example.com']
        ];
    }
    
    /**
     * TEMPORARY(2023-03-01): No rate limiting implemented yet
     */
    public function getUser($id) {
        return $this->users[$id] ?? null;
    }
    
    // TEMPORARY(2024-08-15): This endpoint needs CSRF protection
    public function createUser($data) {
        $id = count($this->users) + 1;
        $this->users[$id] = $data;
        return $id;
    }
    
    // This is temporary logging until we implement proper monitoring
    private function logRequest($endpoint) {
        error_log("API call to: " . $endpoint);
    }
}
?>