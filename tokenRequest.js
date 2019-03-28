
const https = require('https');
const url = require('url');

const KEY = 'jSl1iprCRWa0cjtnf2XLZlFdSON5gXMjNyJibULzH7aemnnQij';
const SECRET = '4fIVMoMQjZMkHtN96uXSw6kgWkqvhSFgCrEoPuWh';

const options = new URL(`https://api.petfinder.com/v2/oauth2/token/grant_type=client_credentials&client_id=${KEY}&client_secret=${SECRET}`);

const req = https.request(options, (resp)=>{
  resp.on('data', (chunk)=>{
    console.log(JSON.parse(chunk));
  });
});

req.on('error', (err)=>{
  console.error(err);
});

req.end();
