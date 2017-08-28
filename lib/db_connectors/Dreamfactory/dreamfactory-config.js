module.exports = {
  //--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------
  INSTANCE_URL: 'http://localhost',
  APP_API_KEY: 'key',
  APP_NAME: 'northwind-app',
  email: 'test@asdfdsf.com',
  password: 'test12345',
  api: '/api/v2/',
  db: 'northwind/',
  service: 'gateway/',
  serviceObject: 'customers',
  tokenKey: 'token',
  overrideMethod: '?method=GET',

  serviceurl: function () {
    return this.instanceurl() + this.service;
  },
  dburl: function () {
    return this.instanceurl() + this.db
  },
  instanceurl: function () {
    return this.INSTANCE_URL + this.api;
  },
  loginurl: function () {
    return this.INSTANCE_URL + '/api/v2/user/session'
  },
  credentials: function () {
    return {email: this.email, password: this.password}
  }
};

