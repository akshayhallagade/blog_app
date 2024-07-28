const { validateToken } = require("../lib/token_gen");

// Checking - If the person requesting for the route is having token or not.
exports.checkForAuthentication = (req, res, next) => {
  const authorizationHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authorizationHeader) {
    req.user = null;
    return next();
  }

  const token = authorizationHeader.split("Bearer ")[1];
  req.user = validateToken(token);
  next();
};

// Authenticating - if
exports.ensureAuthenticated = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ error: "You must be authenticated !" });
  return next();
};
