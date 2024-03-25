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

    async update(bookingId,data){
        try{
            const boo=await Booking.findByPk(bookingId);
            console.log(boo);
            if(data.status){
                boo.status = data.status
            }

            console.log(`the new boo is ${boo}`);
            await boo.save();

            return boo;
        }catch(error){
            if(error.name =='SequelizeValidationError'){
                throw new ValidationError(error)
            }
            throw new AppError(
                'RepositoryError',
                'Cannot update booking',
                'There was some error in updating a booking, please try gain later ',
                StatusCodes.INTERNAL_SERVER_ERROR
            );

        }
    }
}

module.exports = BookingRepository;