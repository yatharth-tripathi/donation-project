import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
  // Add any other fields as necessary
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export default Admin;
