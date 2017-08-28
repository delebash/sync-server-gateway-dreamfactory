//--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------

'use strict';
const querystring = require('querystring');
const config = require('./dreamfactory-config');
const request = require('request-promise-native');
require('request-debug')(request);

const appApiKey = '6919b28e4affbcdf0706414ca9c26a6ba49dee89c350bfcf2268e5532829201a';

const serviceurl = config.serviceurl();
const tableurl = config.dburl() + '_table/changes';

const headers = {
  "X-DreamFactory-API-Key": appApiKey
};


class ChangesTable {
  constructor(name, dbOptions) {
    const options = {
      filename: name,
      autoload: true,
    };
  }


  async add(changeObject) {
    // GET /api/v2/add?n1=4&n2=5
    console.log('test');
    for (let [key, value] of Object.entries(changeObject.obj)) {
      changeObject[key] = value
    }
    changeObject.syncId = changeObject.id;
    changeObject.id = 0;
    delete changeObject.obj;
    let data = {resource: [changeObject]};

    try {

      let result = await request(
        {
          headers: headers,
          url: serviceurl,
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
      console.log(result)
    } catch (e) {
      console.log(e)
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
          url: tableurl + '?filter=' + qs,
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
          url: tableurl + '?filter=' + qs,
          method: 'GET',
        })

      let objResponse = JSON.parse(response);
      let json = JSON.parse(objResponse.resource[0].json);
      if (json.length > 0) {
        rev = json.find(o => o.rev === revisionNumber);
        return rev
      } else {
        return json
      }
    } catch (e) {
    }
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
            url: tableurl + '?filter=' + qs,
            method: 'GET'
          });

        let objResponse = JSON.parse(response);
        let json = JSON.parse(objResponse.resource[0].json);
        if (json.length > 0) {
          rev = json.find(o => o.rev === revisionNumber && o.client_id === clientID);
          return rev
        } else {
          return json
        }


      } catch (e) {

      }
      return rev
    }
  }

}

module.exports = ChangesTable;


