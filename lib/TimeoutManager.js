const CustomError = require('./CustomError');

// Set up timeouts if set in request options; destroy request & reject with error if exceeded
// - response is the time between sending the request and receiving the first byte of the response. Includes DNS and connection time.
// - idle is the time between receiving the last chunk and waiting for the next chunk to be received. Might be fired if a request is stalled before finished (i.e. when internet connection is lost).
// - deadline is the time from the start of the request to receiving the response body in full. If the deadline is too short large files may not load at all on slow connections.
class TimeoutManager {

  constructor({response, idle, deadline} = {}){
    this._req = null;
    this._response = response;
    this._idle = idle;
    this._deadline = deadline;
    this._timeouts = {};
  }

  _setTimeout = {
    response:() => {
      return setTimeout(() => {
        // req.destroy will cause an error event to be emitted, rejection is handled in error event handler     
        this._req.destroy(new CustomError({
          code:'API_RESPONSE_TIMEOUT',
          message:'No data received within specified response timeout (' + this._response + 'ms).',
          timeout:this._response
        }));
      }, this._response);
    },
    deadline:() => {
      return setTimeout(() => {
        // req.destroy will cause an error event to be emitted, rejection is handled in error event handler     
        this._req.destroy(new CustomError({
          code:'API_DEADLINE_TIMEOUT',
          message:'Response was not completely received within specified deadline timeout (' + this._deadline + 'ms).',
          timeout: this._deadline
        }));
      }, this._deadline);
    },
    idle:() => {
      return setTimeout(() => {
        // req.destroy will cause an error event to be emitted, rejection is handled in error event handler 
        this._req.destroy(new CustomError({
          code:'API_IDLE_TIMEOUT',
          message:'Next chunk of response was not received within specified idle timeout (' + this._idle + 'ms).',
          timeout: this._idle
        }));
      }, this._idle);
    }
  }

  init(req){
    this._req = req;
    if (this._response) this._timeouts.response = this._setTimeout.response();
    if (this._deadline) this._timeouts.deadline = this._setTimeout.deadline();
  }

  onResData(){
    if (this._timeouts.response){
      clearTimeout(this._timeouts.response);
      delete this._timeouts.response;
    }
    if (this._timeouts.idle) clearTimeout(this._timeouts.idle);
    if (this._idle) this._timeouts.idle = this._setTimeout.idle();
  }

  onResEnd(){
    if (this._timeouts.idle) clearTimeout(this._timeouts.idle);
    if (this._timeouts.deadline) clearTimeout(this._timeouts.deadline);
  }

}

module.exports = TimeoutManager;