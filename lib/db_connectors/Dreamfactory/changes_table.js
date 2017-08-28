//--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------

'use strict';
const jsonQuery = require('json-query')
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


  _replaceObjectKeys(obj, originalString, replaceString) {
    return Object.keys(obj).reduce((newObj, key) =>
        Object.assign(newObj, {[key.replace(originalString, replaceString)]: obj[key]}),
      {}
    );
  }

  async add(changeObject) {
    // NeDB does not support dots in an object attribute
    // Dexie.Syncable could send mods with dots in the attribute names so
    // we need to replace the dots here
    let mods = changeObject.mods;
    if (mods) {
      mods = this._replaceObjectKeys(mods, '.', this.dotReplacer);

      Object.assign(changeObject, {mods});
    }
    let data = {resource: [changeObject]};
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
      // const query = {};
      //  return this.store.find(query).sort({ rev: 1 })
      let data = {};
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
      if (json.length > 0) {
        rev = json.find(o => o.rev === 1);
      } else
        rev = json.rev || 0

    } catch (e) {
      console.log(e)
    }
    return rev
  }

  // lastestRevision(rev) {
  //   return rev = 1;
  // }
  async getByRevision(revisionNumber) {
    const query = {
      rev: {
        $gt: revisionNumber,
      },
    };
    try {
      let data = {id: 0, rev: 0};
      let qs = querystring.stringify(data)
      let result = await request(
        {
          headers: headers,
          url: url + '?filter=' + qs,
          method: 'GET',
        })
    } catch (e) {
      const resultWithDots = result.map((res) => {
        if (res.mods) {
          const newMods = this._replaceObjectKeys(res.mods, this.dotReplacer, '.');
          Object.assign(res, {mods: newMods});
        }
        return res;
      });
    }
  }

  async getByRevisionAndClientID(revisionNumber, clientID) {
    {
      const query = {
        rev: {
          $gt: revisionNumber,
        },
        source: {
          $ne: clientID,
        },
      };
      try {
        let qs = querystring.stringify(data)
        let data = {id: 1, source: 0};
        let result = await request(
          {
            headers: headers,
            url: url + '?filter=' + qs,
            method: 'GET'
          });
        return result
      } catch (e) {
        const resultWithDots = result.map((res) => {
          if (res.mods) {
            const newMods = this._replaceObjectKeys(res.mods, this.dotReplacer, '.');
            Object.assign(res, {mods: newMods});
          }
          return res;
        });
        return resultWithDots
      }
    }
  }

}

module.exports = ChangesTable;


