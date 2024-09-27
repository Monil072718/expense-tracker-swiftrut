const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      // Get user from the decoded token
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Export the protect function
module.exports = { protect };
