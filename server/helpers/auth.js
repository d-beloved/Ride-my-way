import jwt from 'jsonwebtoken';

/**
 * @description check if logged in user has a valid session token for protected routes
 * @param{object} req - api request
 * @param{object} res - route response
 * @param{object} next - moving to the next handler
 * @return{undefined}
 */
export default {

  authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({ message: 'token is required!', success: false });
    } else {
      // checks if token matches the one provided at login
      const rightToken = token.split(' ')[1]; // Splits the token to reveal the user
      jwt.verify(rightToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'Authentication failed! Token is Invalid or expired. Please Login again', success: false });
        } else {
          req.userData = decoded.userid;
          req.userInfo = `${decoded.firstname} ${decoded.lastname}`;
          next();
        }
      });
    }
  }
};
