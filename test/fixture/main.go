package main

import (
    "fmt"
    "time"
)

// TEMPORARY(2024-02-01): Using hardcoded values until config is implemented
const defaultTimeout = 30

// UserService handles user operations
type UserService struct {
    // temporary field for testing
    debug bool
}

func (u *UserService) GetUser(id int) string {
    // TEMPORARY(2023-05-01): Mock implementation, replace with real DB call
    return fmt.Sprintf("User %d", id)
}

// TEMPORARY(2024-11-30): This function should be removed after refactor
func LegacyHandler() {
    fmt.Println("Legacy code")
}

func main() {
    // This is a temporary main function
    service := &UserService{debug: true}
    fmt.Println(service.GetUser(1))
}