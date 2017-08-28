'use strict';

const config = require('./dreamfactory-config');
const request = require('request-promise-native');
const headers = {
  "X-DreamFactory-API-Key": "APP_API_KEY",
  "X-DreamFactory-Session-Token": "token"
};

let url = config.baseurl() + 'uncommitted_changes';

class UncommittedChangesTable {
  constructor(name, dbOptions) {
    const options = {
      filename: name,
      autoload: true,
    };
    this.request = request
  }

  async update(clientIdentity, changes) {

    const updateRules = {$push: {changes: {$each: changes}}};
    let data = {resource: [{_id: clientIdentity}, updateRules, {upsert: true}]};
    try {
      let result = await request(
        {
          headers: headers,
          url: url,
          method: 'PUT',
          body: JSON.stringify(changObject)
        }
      );
    }
    catch (e) {

    }
  }

  async get (clientIdentity) {
    let data = [{_id: clientIdentity}, {_id: 0}]
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

    try {
      let data = {resource: [{_id: clientIdentity}]}
    } catch (e) {

    }
  }
}

module.exports = UncommittedChangesTable;
