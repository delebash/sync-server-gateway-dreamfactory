//--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------

'use strict';
const querystring = require('querystring');
const config = require('./dreamfactory-config');
const request = require('request-promise-native');
require('request-debug')(request);

const appApiKey = '6919b28e4affbcdf0706414ca9c26a6ba49dee89c350bfcf2268e5532829201a';
const table = 'changes';
const headers = {
  "X-DreamFactory-API-Key": appApiKey
};

const url = config.baseurl() + table;

class ChangesTable {
  constructor(name, dbOptions) {
    const options = {
      filename: name,
      autoload: true,
    };
  }


  async add(changeObject) {
    let data = {changeObject};
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

  async getLatestRevision() {
    let rev
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

      let objResponse = JSON.parse(response);
      let json = JSON.parse(objResponse.resource[0].json);
      rev = json.find(o => o.rev === 1);
      rev = rev || 0
    } catch (e) {
      console.log(e)
    }
    return rev
  }

  async getByRevision(revisionNumber) {
    let rev;
    try {
      let data = {id: 0};
      let qs = querystring.stringify(data)
      let response = await request(
        {
          headers: headers,
          url: url + '?filter=' + qs,
          method: 'GET',
        })

      let objResponse = JSON.parse(response);
      let json = JSON.parse(objResponse.resource[0].json);
      rev = json.find(o => o.rev === revisionNumber);
    } catch (e) {
    }
    return rev
  }

  async getByRevisionAndClientID(revisionNumber, clientID) {
    {

      let rev
      try {
        let data = {id: 0};
        let qs = querystring.stringify(data)

        let response = await request(
          {
            headers: headers,
            url: url + '?filter=' + qs,
            method: 'GET'
          });

        let objResponse = JSON.parse(response);
        let json = objResponse.resource[0].json
        rev = json.find(o => o.rev === revisionNumber && o.client_id === clientID);

      } catch (e) {

      }
      return rev
    }
  }

}

module.exports = ChangesTable;


