const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
// const url = require('url');
const querystring = require('querystring');

const typeReq = require('./typeRequest');

const EventEmitter = require('events');

const port = 3030;

const KEY = 'jSl1iprCRWa0cjtnf2XLZlFdSON5gXMjNyJibULzH7aemnnQij';
const SECRET = '4fIVMoMQjZMkHtN96uXSw6kgWkqvhSFgCrEoPuWh';

const DataEmitter = new EventEmitter();

let AnimalTypes;
DataEmitter.on('moarData', (moarData)=>{
  console.log(moarData);
  AnimalTypes = moarData;
});

// let TOKEN = '';

// const url = new URL(`https://api.petfinder.com/v2/oauth2/token?grant_type=client_credentials&client_id=${KEY}&client_secret=${SECRET}`);

// const url = new URL('https://api.petfinder.com/v2/oauth2/token');
const data = querystring.stringify({
    grant_type: 'client_credentials',
    client_id: KEY,
    client_secret: SECRET
});

const options = {
    method: 'POST',
    // url: url,
    hostname: 'api.petfinder.com',
    path: '/v2/oauth2/token',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
};

const req = https.request(options, (resp)=>{
    console.log('In req block');
    console.log(`Status code: ${resp.statusCode}`);
    console.log(resp.headers);
    resp.on('data', (chunk)=>{
        let theChunk = JSON.parse(chunk);
        console.log(theChunk);
        const TOKEN = theChunk.access_token;
        let data;
        // console.log(`Token is ${TOKEN}`);
        const newOptions = {
            method: 'GET',
            hostname: 'api.petfinder.com',
            path: '/v2/types',
            headers: {
                'Authorization': ` Bearer ${TOKEN}`
            }
        };
        // console.log(newOptions);
        const newCallback = (typeResp)=>{
          console.log('In Type Request');
          // console.log(`Token is: ${TOKEN}`);
          console.log(`Status Code: ${typeResp.statusCode}`);
          typeResp.on('data', (types)=>{
              // console.log(JSON.parse(types));
              data = JSON.parse(types);
              DataEmitter.emit('moarData', data);
          });
        };
        const newReq = https.request(newOptions, newCallback);
        newReq.end();
    });
});

req.on('error', (err)=>{
    console.error(err);
});

req.write(data);
req.end();

app.get('/getTypes', (req, resp)=>{
  resp.set({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
      'Content-Length': AnimalTypes.length,
  });
  // console.log(resp.headers);
  resp.json(AnimalTypes);
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});

//Request for Animal Types
