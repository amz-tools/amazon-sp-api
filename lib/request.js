const CustomError = require('./CustomError');
const https = require('https');
const { URL } = require('url');

// Set up timeouts if set in request options; destroy request & reject with error if exceeded
// - response is the time between sending the request and receiving the first byte of the response. Includes DNS and connection time.
// - idle is the time between receiving the last chunk and waiting for the next chunk to be received. Might be fired if a request is stalled before finished (i.e. when internet connection is lost).
// - deadline is the time from the start of the request to receiving the response body in full. If the deadline is too short large files may not load at all on slow connections.

function timeoutManager() {
  this.req = null;
  this.to_idle = null;
  this.to_deadline = null;
  this.to_response = null;
  this.timeout_idle = 0;

  const _setResponseTimeout = (timeout_ms) => {
    this.to_response = setTimeout(() => {
      // req.destroy will cause an error event to be emitted, rejection is handled in error event handler
      this.req.destroy(new CustomError({ 
        code:'API_RESPONSE_TIMEOUT',
        message:'No data received within specified response timeout (' + timeout_ms + 'ms).',
        timeout:timeout_ms
      }));
    }, timeout_ms);
  }

  const _setDeadlineTimeout = (timeout_ms) => {
    this.to_deadline = setTimeout(() => {
      // req.destroy will cause an error event to be emitted, rejection is handled in error event handler     
      this.req.destroy(new CustomError({ 
        code:'API_DEADLINE_TIMEOUT',
        message:'Response was not completely received within specified deadline timeout (' + timeout_ms + 'ms).',
        timeout: timeout_ms
      }));
    }, timeout_ms);
  }

  const _setIdleTimeout = () => {
    if(!this.timeout_idle) return;
    const timeout_ms = this.timeout_idle;
    this.to_idle = setTimeout(() => {
      // req.destroy will cause an error event to be emitted, rejection is handled in error event handler 
      this.req.destroy(new CustomError({ 
        code:'API_IDLE_TIMEOUT',
        message:'Next chunk of response was not received within specified idle timeout (' + timeout_ms + 'ms).',
        timeout: timeout_ms
      }));
    }, timeout_ms);
  }

  this.resNewData = () => {
    if(this.to_response) {
      clearTimeout(this.to_response);
      this.to_response = null;
    }
    if(this.to_idle) {
      clearTimeout(this.to_idle);
      _setIdleTimeout();
    }
  }

  this.resEndData = () => {
    if(this.to_deadline) {
      clearTimeout(this.to_deadline);
    }
    if(this.to_idle) {
      clearTimeout(this.to_idle);
    }
    if(this.to_idle) {
      clearTimeout(this.to_idle);
    }
  }

  this.timeoutInit = (req, timeouts) => {
    if(!timeouts) return;
    this.req = req;
    this.timeout_idle = timeouts.idle;
    _setIdleTimeout();
    if(timeouts.response) _setResponseTimeout(timeouts.response);
    if(timeouts.deadline) _setDeadlineTimeout(timeouts.deadline);
  }
}

module.exports = (req_options) => {
  return new Promise((resolve, reject) => {
    let url = new URL(req_options.url);
    let options = {
      method:req_options.method,
      port:443,
      hostname:url.hostname,
      path:url.pathname + url.search,
      headers:req_options.headers || {}
    };

    let post_params;
    if (req_options.body){
      post_params = req_options.body;
      options.headers['Content-Length'] = Buffer.byteLength(post_params);
    }

    let toutMan = new timeoutManager();
 
    let req = https.request(options, (res) => {
      let chunks = [];
      let body = '';
      res.on('data', (chunk) => {
        toutMan.resNewData();
        body += chunk;
        chunks.push(chunk);
      });
      res.on('end', () => {
        toutMan.resEndData();
        resolve({
          body:body,
          chunks:chunks,
          statusCode:res.statusCode,
          headers:res.headers
        });
      });
    });

    toutMan.timeoutInit(req, req_options.timeouts);

    req.on('error', (e) => {
      toutMan.resEndData();
      reject(e);
    });
    if (post_params){
      req.write(post_params, 'utf8');
    }
    req.end();
  });
};
