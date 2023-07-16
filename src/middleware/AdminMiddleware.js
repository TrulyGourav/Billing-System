const adminAuthMiddleware = (req, res, next) => {
    if (!req.user || !req.user.role){
        console.log("role not accessible/defined");
    }
    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      // User is admin, allow the request to proceed
      next();
    } else {
      // User is not an admin, return unauthorized response
      return res.status(401).json({ error: 'Unauthorized to access admin resources' });
    }
};

module.exports = adminAuthMiddleware;
  