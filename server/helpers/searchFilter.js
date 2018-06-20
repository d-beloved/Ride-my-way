import db from '../dummyData';

const { rideOffer } = db;

/**
 * @description - This searches the Ride Offer by its destination
 */
class searchFilter {
  /**
   * @description - Searches for a ride offer by its destination
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Object} next - next function
   * @return{json} ride offers that matches the search term
   */
  static byDestination(req, res, next) {
    const { destination } = req.query;
    const result = [];
    if (destination) {
      for (let i = 0; i < rideOffer.length; i += 1) {
        if (destination.toLowerCase() === rideOffer[i].destination.toLowerCase()) {
          result.push(rideOffer[i]);
        }
      }
      if (result.length === 0) {
        return res.status(404).json({
          message: 'There is no Ride offer with the specified destination',
          error: true
        });
      }
      return res.status(200).json(result);
    }
    next();
  }
}

export default searchFilter;
