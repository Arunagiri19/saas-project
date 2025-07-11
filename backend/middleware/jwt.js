import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const decoded = jwt.verify(token, 'credo_secret');

    req.email = decoded.email; // Attach decoded email to the request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(400).json({ message: 'Token Invalid' });
  }
};

export default authMiddleware;
