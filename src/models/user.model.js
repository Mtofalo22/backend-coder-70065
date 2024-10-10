import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: String, default: 'generic_cart_id' },
  role: { type: String, default: 'user' }
}, { collection: 'users' }); 


const User = mongoose.model('User', userSchema);

export default User;
