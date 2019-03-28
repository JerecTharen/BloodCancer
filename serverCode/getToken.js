
const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

const KEY = 'jSl1iprCRWa0cjtnf2XLZlFdSON5gXMjNyJibULzH7aemnnQij';
const SECRET = '4fIVMoMQjZMkHtN96uXSw6kgWkqvhSFgCrEoPuWh';

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
        fs.writeFile('./serverCode/TOKEN.json', chunk, 'utf8', (err => {
            if(err) {
                console.error(err);
            }
        }));
        // const TOKEN = theChunk.access_token;
    });
});

module.exports = req;

// req.on('error', (err)=>{
//     console.error(err);
// });
//
// req.write(data);
// req.end();
