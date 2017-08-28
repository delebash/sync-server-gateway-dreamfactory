'use strict';

const config = require('./dreamfactory-config');
const request = require('request-promise-native');
const headers = {
  "X-DreamFactory-API-Key": "APP_API_KEY",
  "X-DreamFactory-Session-Token": "token"
};
const url = config.baseurl() + 'customers';

class Table {
  constructor(name, dbOptions) {
    const filename = `${name}.table`;
    const options = {
      filename,
      autoload: true,
    };
  }

  _addID(key, obj) {
    return Object.assign({}, obj, {_id: key});
  }

  async add(key, changeObject) {
    let data = [(this._addID(key, changeObject))];
    try {
      let result = await request(
        {
          headers: headers,
          url: url,
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
    } catch (e) {

    }

  }

  async get (key) {
    try {
      let data = {id: 0};
      let qs = querystring.stringify(data);
      let response = await request(
        {
          headers: headers,
          url: url + '?filter=' + qs,
          method: 'GET'
        }
      );

      let result = JSON.parse(response);
      return result

    } catch (e) {
      console.log(e)
    }
  }

  async update(key, changeObject) {
    let data = [{id: key}, changeObject, {}];
    try {
      let result = await request(
        {
          headers: headers,
          url: url,
          method: 'PUT',
          body: JSON.stringify(data)
        }
      );
    } catch (e) {

    }
  }

  async remove(key) {
    let data = {id: key};
    try {
      let result = await request(
        {
          headers: headers,
          url: url,
          method: 'DELETE',
          body: JSON.stringify(data)
        }
      );
    } catch (e) {

    }
  }
}

module.exports = Table;
