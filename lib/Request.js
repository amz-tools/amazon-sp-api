const qs = require("qs");
const utils = require("./utils");
const TimeoutManager = require("./TimeoutManager");
const https = require("https");
const { URL } = require("url");

class Request {
  constructor(region, options) {
    this._region = region;
    this._aws_regions = {
      eu: "eu-west-1",
      na: "us-east-1",
      fe: "us-west-2"
    };
    this._options = options;
    let sandbox_prefix = this._options.use_sandbox ? "sandbox." : "";
    this._api_endpoint = `${sandbox_prefix}sellingpartnerapi-${this._region}.amazon.com`;
    this._iso_date;
  }

  _getUTCISODate() {
    return new Date().toISOString().replace(/[:\-]|\.\d{3}/g, "");
  }

  _encodeApiPath(api_path) {
    return api_path
      .split("/")
      .map((url_part) => {
        return utils.encodeURIComponent(url_part);
      })
      .join("/");
  }

  _constructEncodedQueryString(query, encode_twice) {
    if (query) {
      let key_is_array = false;
      return qs.stringify(query, {
        encoder: (value, defaultEncoder, charset, type) => {
          if (type === "key") {
            key_is_array = Array.isArray(query[value]);
          }
          return encode_twice
            ? utils.doubleEncodeURICompenent(value, key_is_array)
            : utils.encodeURIComponent(value);
        },
        arrayFormat: "comma",
        commaRoundTrip: false,
        sort: (a, b) => {
          return a.localeCompare(b);
        }
      });
    }
    return "";
  }

  _constructURL(req_params, encoded_query_string) {
    // We don't have to encode api_path parts here because parts have already been encoded in version operation definitions
    let url = "https://" + this._api_endpoint + req_params.api_path;
    if (encoded_query_string !== "") {
      url += "?" + encoded_query_string;
    }
    return url;
  }

  _constructRequestOptions(access_token, req_params) {
    let encoded_query_string = this._constructEncodedQueryString(
      req_params.query,
      req_params.encode_twice
    );

    return {
      method: req_params.method,
      url: this._constructURL(req_params, encoded_query_string),
      body: req_params.body ? JSON.stringify(req_params.body) : null,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        host: this._api_endpoint,
        "user-agent": this._options.user_agent,
        "x-amz-access-token": access_token,
        "x-amz-date": this._getUTCISODate(),
        ...(req_params.headers || {})
      },
      timeouts: req_params.timeouts
    };
  }

  async _wait(restore_rate) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, restore_rate * 1000);
    });
  }

  async _retryRequest(code, req_options, req_params) {
    // When an ETIMEDOUT error is fired we retry after 10 seconds or after the restore rate
    // depending on which value is higher to give the server some time to recover
    const restore_rate = req_params.restore_rate
      ? Math.max(...[req_params.restore_rate, 10])
      : 10;
    if (this._options.debug_log) {
      console.log(
        `Request failed with error ${code}, retrying a call of ${
          req_params.operation || req_params.api_path || req_options.url
        } in ${restore_rate} seconds...`
      );
      await this._wait(restore_rate);
    }
    return await this.execute(req_options, req_params);
  }

  execute(req_options, req_params = {}) {
    return new Promise((resolve, reject) => {
      let url = new URL(req_options.url);
      let options = {
        method: req_options.method,
        port: 443,
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: req_options.headers || {},
        ...(this._options.https_proxy_agent
          ? { agent: this._options.https_proxy_agent }
          : {})
      };

      let post_params;
      if (req_options.body) {
        post_params = req_options.body;
        options.headers["Content-Length"] = Buffer.byteLength(post_params);
      }

      let timeouts = new TimeoutManager(req_options.timeouts);

      let req = https.request(options, (res) => {
        let chunks = [];
        let body = "";
        res.on("data", (chunk) => {
          timeouts.onResData();
          body += chunk;
          chunks.push(chunk);
        });
        res.on("end", () => {
          timeouts.onResEnd();
          resolve({
            body: body,
            chunks: chunks,
            statusCode: res.statusCode,
            headers: res.headers
          });
        });
      });

      timeouts.init(req);

      req.on("error", async (e) => {
        timeouts.onResEnd();
        if (
          ["ETIMEDOUT", "ENOTFOUND", "ECONNRESET"].includes(e.code) &&
          this._options.retry_remote_timeout
        )
          resolve(await this._retryRequest(e.code, req_options, req_params));
        reject(e);
      });
      if (post_params) {
        req.write(post_params, "utf8");
      }
      req.end();
    });
  }

  async api(access_token, req_params) {
    let req_options = this._constructRequestOptions(access_token, req_params);
    return await this.execute(req_options, req_params);
  }
}

module.exports = Request;
