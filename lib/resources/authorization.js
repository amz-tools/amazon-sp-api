module.exports = {
  authorization:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getAuthorizationCode',
  	],
    ...require('./versions/authorization/authorization_v1')
  }
};