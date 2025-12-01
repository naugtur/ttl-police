interface User {
  id: number;
  name: string;
  email: string;
}

// TEMPORARY(2024-01-25): Using localStorage until backend is ready
class UserStore {
  private users: User[] = [];
  
  constructor() {
    // temporary mock data
    this.users = [
      { id: 1, name: "Alice", email: "alice@test.com" },
      { id: 2, name: "Bob", email: "bob@test.com" }
    ];
  }
  
  // TEMPORARY(2023-08-01): No error handling for invalid IDs
  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
  
  // TEMPORARY(2024-07-01): Missing validation logic
  addUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
  
  // This is just a temporary helper method
  getAllUsers(): User[] {
    return this.users;
  }
}

export { User, UserStore };