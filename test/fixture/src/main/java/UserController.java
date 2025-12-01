package com.example.userservice;

import java.util.List;
import java.util.ArrayList;

/**
 * TEMPORARY(2024-01-14): Basic user controller until Spring Boot migration
 */
public class UserController {
    
    // TEMPORARY(2023-10-20): In-memory list until JPA repository is configured
    private List<User> users = new ArrayList<>();
    
    public UserController() {
        // temporary test users
        users.add(new User(1, "Admin", "admin@temp.com"));
        users.add(new User(2, "Guest", "guest@temp.com"));
    }
    
    /**
     * TEMPORARY(2024-06-10): No pagination until requirements are finalized
     */
    public List<User> getAllUsers() {
        return users;
    }
    
    // TEMPORARY(2023-11-25): Basic CRUD without validation
    public User createUser(String name, String email) {
        int id = users.size() + 1;
        User user = new User(id, name, email);
        users.add(user);
        return user;
    }
    
    // This is a temporary method for debugging purposes
    public void printAllUsers() {
        users.forEach(System.out::println);
    }
}