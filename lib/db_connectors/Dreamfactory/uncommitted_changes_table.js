'use strict';

const config = require('./dreamfactory-config');
const request = require('request-promise-native');
const headers = {
  "X-DreamFactory-API-Key": "APP_API_KEY",
  "X-DreamFactory-Session-Token": "token"
};

const serviceurl = config.serviceurl();
const tableurl = config.dburl() + '_table/uncommitted_changes';

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
    let data = [{_id: clientIdentity}, updateRules, {upsert: true}];
    try {
      let result = await request(
        {
          headers: headers,
          url: serviceurl,
          method: 'PUT',
          body: JSON.stringify(data)
        }
      );
      console.log('uncommited')
    }
    catch (e) {

    }
  }

  async get (clientIdentity) {
    let result;
    try {
      let data = {id: 0};
      let qs = querystring.stringify(data)
      let response = await request(
        {
          headers: headers,
          url: tableurl + '?filter=' + qs,
          method: 'GET',
        })

      let objResponse = JSON.parse(response);
      let json = JSON.parse(objResponse.resource[0].json);
      result = json.find(o => o.clientIdentity === clientIdentity);

      try {
        let data = {id: key};
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

    } catch (e) {
    }
    return (result || {changes: []})

  }
}

module.exports = UncommittedChangesTable;
