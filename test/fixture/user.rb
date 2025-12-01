# User Management Module
# TEMPORARY(2024-01-10): Using file-based storage until Redis is configured

class User
  attr_accessor :id, :name, :email
  
  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
  end
  
  # TEMPORARY(2023-04-01): Placeholder validation, needs proper regex
  def valid_email?
    @email.include?('@')
  end
  
  # This is a temporary method for debugging
  def debug_info
    "User: #{@name} (#{@email})"
  end
end

# TEMPORARY(2024-09-01): Mock user repository
class UserRepository
  def initialize
    # temporary in-memory storage
    @users = []
  end
  
  def save(user)
    @users << user
  end
end