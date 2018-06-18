import db from '../dummyData';

const { rideOffer } = db;

/**
 * @description - creates the Ride offer components and performs CRUD functions on it
 */
class rideOfferController {
  /**
   * @description - Creates a new ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered ride offer details
   */
  static createRideOffer(req, res) {
    rideOffer.push({
      id: rideOffer.length + 1,
      title: req.body.title,
      driverName: req.body.driverName,
      destination: req.body.destination,
      deparTerminal: req.body.deparTerminal,
      date: req.body.date,
      fee: req.body.fee
    });
    return res.status(201).json({
      message: 'Ride offer created successfully',
      error: false
    });
  }

  /**
   * @description - Get all ride offers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered ride offer details
   */
  static getAllRideOffer(req, res) {
    if (rideOffer.length < 1) {
      return res.status(404).json({
        message: 'No ride Offer found!',
        error: true
      });
    }
    return res.status(200).json({
      rideOffer,
      error: false
    });
  }

  /**
   * @description - Get one ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered ride offer details
   */
  static getOneRideOffer(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element with the parsed id
    const offer = rideOffer.find(oneRide => oneRide.id === offerId);
    if (offer === undefined) {
      return res.status(404).json({
        message: 'Ride Offer not found!',
        error: true
      });
    }
    return res.status(200).json({
      offer,
      error: false
    });
  }
}

export default rideOfferController;
