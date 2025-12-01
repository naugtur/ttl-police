using System;
using System.Collections.Generic;

namespace UserService
{
    // TEMPORARY(2024-01-12): Basic user model until domain is properly designed
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        
        // temporary constructor
        public User(int id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
        }
    }
    
    // TEMPORARY(2023-12-01): In-memory repository until Entity Framework is configured
    public class UserRepository
    {
        private List<User> _users = new List<User>();
        
        // TEMPORARY(2024-03-15): No async methods until database integration
        public User GetUser(int id)
        {
            return _users.Find(u => u.Id == id);
        }
        
        // This is a temporary method for testing
        public void AddTestData()
        {
            _users.Add(new User(1, "Test User", "test@example.com"));
        }
    }
}