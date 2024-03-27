const amqplib = require('amqplib')
const {EXCHANGE_NAME  , MESSAGE_BROKER_URL} = require('../config/serverConfig')
//creating the channel 
const createChannel = async()=>{
   try{

        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
    
        /*
        one the channel is creted ,this meggage broker like(rabbitmq)
        aslo helped to distribute the message between the queues .
        assertExchange(exchange_name,exchange_type,[options ,[functions(err,ok){...}]] )
        */
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;

   }catch(error){

        throw{error}

   }
}

//subscribing to the message queue
const subscribeMessage = async (channel,service ,binding_key)=>{
    try{
        const applicationQueue = await channel.assertExchange("QUEUE_NAME");
        channel.bindQueue(queue.queue,EXCHANGE_NAME,binding_key);

        channel.consume(applicationQueue,msg =>{
            console.log('recieved data');
            console.log(msg.content.toString());
            channel.ack(msg);
         })

    }catch(error){
        throw {error}
    }
    
}

//publish the message 
const publishMessage = async(channel, binding_key,message) =>{
    try{

        await channel.assertQueue('QUEUE_NAME')
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));


    }catch(error){
        throw {error};
    }
}

module.exports ={
    subscribeMessage,
    createChannel,
    publishMessage
}