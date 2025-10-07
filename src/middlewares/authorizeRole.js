// middleware/authorizeRole.js

module.exports = function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    try {
      const user = req.user; // المفروض تكون حاطط req.user بعد ما تعمل JWT verify

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: no user found' });
      }

      // لو رول المستخدم مش من ضمن اللي مسموح بيهم
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
      }

      // تمام، نكمل
      next();
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
};
