const {StatusCodes} = require('http-status-codes')
class ValidationError extends Error {
    constructor(error){
        super();
        let explanation =[];
        error.errors.array.forEach(element => {
            explanation.push(element.message)
        });
        this.name ='ValidationError';
        this.message = 'not able to validate the data in sent in the request';
        this.explanation =explanation,
        this.statusCode = statusCode
    }
}

module.exports =ValidationError