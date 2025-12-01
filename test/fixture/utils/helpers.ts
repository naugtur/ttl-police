// Utility functions for data processing
// TEMPORARY(2024-02-03): Helper functions until utility library is chosen

/**
 * TEMPORARY(2023-04-10): Basic validation until proper schema validation
 */
export function validateEmail(email: string): boolean {
  // temporary regex pattern
  return email.includes('@') && email.includes('.');
}

// TEMPORARY(2024-09-15): Manual formatting until internationalization is added
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// This is just temporary until we implement proper error handling
export function handleError(error: Error): void {
  console.error('Temporary error handler:', error.message);
}

// TEMPORARY(2023-07-20): Mock data generator for testing
export function generateMockUser(id: number) {
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@temp.com`,
    // temporary timestamp
    createdAt: new Date()
  };
}