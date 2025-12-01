// This is a test fixture file
function calculateTax(amount) {
  // TEMPORARY(2024-01-01): Using fixed rate until API is ready
  const taxRate = 0.08;
  
  // This is a temporary fix for the bug
  if (amount < 0) {
    return 0;
  }
  
  return amount * taxRate;
}

// TEMPORARY(2025-12-31): Future date test
const futureComment = true;

// TEMPORARY(2023-01-01): This should be expired
const expiredComment = true;

// TEMPORARY(invalid-date): Bad date format
const badDate = true;

export { calculateTax };