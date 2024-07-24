// src/pages/api/users/login.jsx
import { connect } from '../../../dbConfig/dbConfig';
import User from '../../../models/userModel';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connect(process.env.MONGO_URI); // Connect to MongoDB using environment variable
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}