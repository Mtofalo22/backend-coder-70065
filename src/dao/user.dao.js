import User from '../models/user.model.js';

class UserDAO {
  async getUserById(id) {
    return await User.findById(id);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).select('+password');;
  }

  async createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
  }
}

export default UserDAO;
