const { response } = require('express');
const {BookingService} = require('../services/index');
const bookingService = new BookingService();

const { createChannel,publishMessage } = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY} =require('../config/serverConfig')

const {StatusCodes} = require('http-status-codes')
class BookingController{

    constructor(){
        
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel()
        const data  = {message:"Success"}
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data))
        return res.status(200).json({
            message:"sucessfuly published the event "
        });

        
    }

    async create(req,res){

        try{
            const response= await bookingService.createBooking(req.body)
            return res.status(StatusCodes.OK).json({
                message:'sucessfully created a booking',
                success:true,
                err:{},
                data:response
    
            })
        }catch(error){
            return res.status(500).json({
                message:error.message,
                success:false,
                err:error.explanation,
                data:{}
            })
    
        }

    }
}



module.exports = BookingController