
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');

//imports
const getAnimalTypes = require('./serverCode/getAnimalTypes');
const createRequests = require('./serverCode/requestCreator');

const TOKEN = require('./serverCode/TOKEN');
const port = 3030;
const KEY = 'jSl1iprCRWa0cjtnf2XLZlFdSON5gXMjNyJibULzH7aemnnQij';
const SECRET = '4fIVMoMQjZMkHtN96uXSw6kgWkqvhSFgCrEoPuWh';

app.use(bodyParser.json());

let token;

if(TOKEN.value === null){
    const getToken = require('./serverCode/getToken');
    let tokenData = querystring.stringify({
        grant_type: 'client_credentials',
        client_id: KEY,
        client_secret: SECRET
    });
    getToken.on('error', (err => {
        if(err){
            console.log('Logging Error');
            console.error(err);
        }
    }));
    getToken.write(tokenData);
    getToken.end();

    getToken.on('end', ()=>{
        console.log(token);
        token = TOKEN.access_token;
        console.log('token is now', token);
    });
}
else{
    token = TOKEN.access_token;
    console.log(token);
}

app.get('/getTypes', (req, resp)=>{
  let sendData;
  let reqOptions = createRequests.opt(TOKEN.access_token, '/v2/types');
  let reqCallback = createRequests.call(TOKEN.access_token);
  let myCallback = (apiResp)=>{
    apiResp.on('data', (chunk)=>{
      console.log('chunk is', JSON.parse(chunk));
      sendData = JSON.parse(chunk);
      // resp.send(chunk);
      resp.set({
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
          'Content-Length': sendData.length,
      });
      resp.json(sendData);
      console.log('resp should be sent');
    });
  };
  let requestActual = createRequests.req(reqOptions, myCallback);
  requestActual.end();
  // resp.send(getAnimalTypes(requestActual));
});

app.get('/petapi/:path', (req, resp)=>{
  let sendData;
  let newPath = '';
  let newPathArr = req.params.path.split('-');
  console.log(newPathArr);
  for(let i = 0; i < newPathArr.length; i++){
    if(i < newPathArr.length -1){
      newPath += `${newPathArr[i]}/`;
    }
  }
  let reqOptions = createRequests.opt(TOKEN.access_token, newPath);
  let callback = (apiResp)=>{
    apiResp.on('data', (chunk)=>{
      sendData = JSON.parse(chunk);
      resp.set({
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json',
          'Content-Length': sendData.length,
      });
      resp.json(sendData);
    });
  };
  let apiReq = createRequests.req(reqOptions, callback);
  apiReq.end();
});

// app.get('/getAnimalTypes', getAnimalTypes(token));

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});
