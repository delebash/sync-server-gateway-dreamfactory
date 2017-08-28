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
    let data = {resource:[(this._addID(key, changeObject))]};
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
    let data = [{id:key},{id:0}];
    let qs = querystring.stringify(data);
    try {
      let result = await request(
        {
          headers: headers,
          url: url + '?filter=' + qs,
          method: 'GET'
        }
      );
    } catch (e) {

    }
  }

  async update(key, changeObject) {
    let data = {resource: [{id: key }, changeObject, {}]};
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
    let data = {resource:[{ id: key }]};
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
