import React from 'react';
import { useState } from 'react';

// TEMPORARY(2024-01-16): Basic component until design system is integrated
const UserList = () => {
  // temporary state management
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' }
  ]);

  // TEMPORARY(2023-05-20): Inline styles until CSS modules are configured
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5'
  };

  // TEMPORARY(2024-04-05): Mock delete function until API integration
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div style={containerStyle}>
      <h2>User Management</h2>
      {/* TEMPORARY(2024-02-12): Basic list rendering until virtualization is added */}
      {users.map(user => (
        <div key={user.id} className="user-item">
          <span>{user.name} - {user.email}</span>
          {/* This is a temporary delete button */}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;