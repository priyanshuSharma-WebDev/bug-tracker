class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } 
    else if (this instanceof NotFound) {
      return 404;
    } 
    else if(this instanceof UnAuthorized) {
      return 401
    }
    else {
      return 500;
    }
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class UnAuthorized extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  UnAuthorized
};