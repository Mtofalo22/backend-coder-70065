import UserDAO from '../dao/user.dao.js';
import { UserDTO } from '../dao/DTOs/user.dto.js';

export class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async findById(id) {
    try {
      const user = await this.userDAO.getUserById(id);
      return user ? new UserDTO(user) : null;
    } catch (error) {
      console.error(`Error finding user by ID: ${id}`, error);
      throw new Error('Error fetching user data');
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.userDAO.getUserByEmail(email);
      return user ? new UserDTO(user) : null;
    } catch (error) {
      console.error(`Error finding user by email: ${email}`, error);
      throw new Error('Error fetching user data');
    }
  }

  async createUser(userData) {
    try {
      const user = await this.userDAO.createUser(userData);
      return new UserDTO(user);
    } catch (error) {
      console.error('Error creating user', error);
      throw new Error('Failed to create user');
    }
  }
}
