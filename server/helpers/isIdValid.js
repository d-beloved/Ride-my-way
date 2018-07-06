// checks if the entered Id is a number
const idValidator = (req, res, next) => {
  let testId = req.params.requestId;
  if (req.params.rideId) {
    testId = req.params.rideId;
  }
  const id = parseInt(testId, 10);
  if (!id || id < 0 || id !== Number(testId)) return res.status(400).json({ message: 'You passed an invalid ID', success: false });
  next();
};
export default idValidator;
