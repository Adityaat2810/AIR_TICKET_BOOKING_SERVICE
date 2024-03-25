const {BookingRepository} = require('../repository/index')
const axios = require('axios')
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const ServiceError = require('../utils/errors/service-error');

class BookingService{

    constructor(){
        this.bookingRepository = new BookingRepository();

    }

    async createBooking(data){
        try{
            const flightId = data.flightId;
            // fetch data from flight repository
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(getFlightRequestUrl);
            //return flight.data.data;
            const flightData = response.data.data;

            let priceOfFlight = flightData.price;

            if(data.noOfSeats>flightData.totalSetsAvailable){

                throw new ServiceError(
                    `something went wrong in the booking process`,
                    `Insufficient seats in the flight`
                )
            }

            const totalCost= priceOfFlight* data.noOfSeats;
            
            // create booking 
            const bookingPayload ={...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);

            // update the flight data
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}` ;
            await axios.patch(updateFlightRequestUrl,{
                totalSetsAvailable:flightData.totalSetsAvailable-booking.noOfSeats
            });

            return booking;

        }catch(error){
           if(
            error.name =='RepositoryError'  ||
            error.name =='ValidationError'
           ) {
            throw error;
           }
           throw new ServiceError();
        }

    }

}

module.exports = BookingService