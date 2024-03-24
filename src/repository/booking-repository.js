const { ValidationError, AppError } = require('../utils/errors/index');
const {Booking} = require('../models/index')
const {StatusCodes }= require('http-status-codes');
const booking = require('../models/booking');

class BookingRepository{

    async create(data){
        try{

            const booking = await Booking.create(data);
            return booking;

        }catch(error){
            if(error.name =='SequelizeValidationError'){
                throw new ValidationError(error)
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create booking',
                'There was some error creating a booking, please try gain later ',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(data){
        
    }
}

module.exports = BookingRepository;