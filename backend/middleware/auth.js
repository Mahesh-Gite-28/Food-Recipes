const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};
