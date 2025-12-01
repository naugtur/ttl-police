public class UserController {
    // TEMPORARY(2024-01-20): Using in-memory storage until database is set up
    private Map<Integer, String> users = new HashMap<>();
    
    public UserController() {
        // temporary test data
        users.put(1, "John Doe");
        users.put(2, "Jane Smith");
    }
    
    /**
     * TEMPORARY(2023-07-01): Basic implementation without validation
     */
    public String getUser(int id) {
        return users.get(id);
    }
    
    // TEMPORARY(2024-10-15): This method needs security checks
    public void deleteUser(int id) {
        users.remove(id);
    }
    
    // This is just temporary until we implement proper authentication
    public boolean isValidUser(String token) {
        return token.equals("temp-token");
    }
}