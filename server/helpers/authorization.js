// checks if a token was passed into the request header
if (req.headers.authorization) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;
    if (req.userData !== null) {
      return res.status(200).json({ message: 'You are already logged in' });
    }
  } catch (error) {
    return res.status(401)
      .json({ message: 'Token is invalid or has expired, Please re-login' });
  }
}