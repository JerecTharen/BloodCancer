const https = require('https');
// const url = require('url');
const querystring = require('querystring');

const typeReq = require('./typeRequest');

const KEY = 'jSl1iprCRWa0cjtnf2XLZlFdSON5gXMjNyJibULzH7aemnnQij';
const SECRET = '4fIVMoMQjZMkHtN96uXSw6kgWkqvhSFgCrEoPuWh';

// let TOKEN = '';

// const url = new URL(`https://api.petfinder.com/v2/oauth2/token?grant_type=client_credentials&client_id=${KEY}&client_secret=${SECRET}`);

const url = new URL('https://api.petfinder.com/v2/oauth2/token');
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
        // console.log(`Token is ${TOKEN}`);
        const newOptions = typeReq.opt(TOKEN);
        // console.log(newOptions);
        const newCallback = typeReq.call(TOKEN);
        const newReq = typeReq.req(newOptions, newCallback);
        newReq.end();
    });
});

req.on('error', (err)=>{
    console.error(err);
});

req.write(data);
req.end();

//Request for Animal Types
