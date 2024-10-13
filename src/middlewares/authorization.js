
export const isAdmin = (req, res, next) => {
  console.log("req.user:", req.user);
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied. Users only.' });
  }
};
