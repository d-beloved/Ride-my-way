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

  /**
   * @description - Deletes a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} a json message
   */
  static deleteRideOffer(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element index with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer not found or deleted already',
        error: true
      });
    }
    rideOffer.splice(offer, 1);
    return res.status(200).json({
      message: 'Ride Offer deleted successfully',
      error: false
    });
  }

  /**
   * @description - Edit a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} a json message
   */
  static modifyRideOffer(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element index with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer not found!',
        error: true
      });
    }
    // Edits the value of the found ride offer
    rideOffer[offer].title = req.body.title || rideOffer[offer].title;
    rideOffer[offer].driverName = req.body.driverName || rideOffer[offer].driverName;
    rideOffer[offer].destination = req.body.destination || rideOffer[offer].destination;
    rideOffer[offer].deparTerminal = req.body.deparTerminal || rideOffer[offer].deparTerminal;
    rideOffer[offer].date = req.body.date || rideOffer[offer].date;
    rideOffer[offer].fee = req.body.fee || rideOffer[offer].fee;
    return res.status(200).json({
      message: 'Ride Offer updated successfully!',
      error: false
    });
  }
}

export default rideOfferController;
