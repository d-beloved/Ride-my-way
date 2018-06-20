import db from '../dummyData';

const { request, rideOffer } = db;

/**
 * @description - creates the request to join a Ride offer components
 */
class requestRideController {
  /**
   * @description - Creates a new request for Ride
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} message and status code
   */
  static makeRequestForRide(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer not found!',
        error: true
      });
    }
    request.push({
      id: request.length + 1,
      requester: req.body.requester,
      status: 'pending'
    });
    return res.status(201).json({
      message: 'Your request is registered, Pending for acceptance. Thanks a lot!',
      error: false
    });
  }
}

export default requestRideController;
