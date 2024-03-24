// generic app error file 
class AppError extends Error {
    constructor(
        name,
        messsage,
        explanation,
        statusCode
    ){
        super();
        this.name = name;
        this.message = messsage;
        this.explanation = explanation;
        this.statusCode =statusCode
    }
}

module.exports = AppError;
