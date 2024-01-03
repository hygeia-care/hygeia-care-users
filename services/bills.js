const axios = require('axios');
//const urlJoin = require('url-join');
const debug = require('debug')('bills-service:get-bills');

//const BILLS_SERVICE = process.env.BILLS_SERVICE  || 'http://localhost:3337';
//const API_VERSION = "/api/v1";

const url = 'http://localhost:3337/api/v1/bills';

const getBills = async function() {
    try {
        //const url = urlJoin(BILLS_SERVICE, API_VERSION, '/bills');
        const response = await axios.get(url);
        debug(response);
        return response.data;
    } catch(error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    "getBills": getBills
}