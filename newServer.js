
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const querystring = require('querystring');

//imports
const getAnimalTypes = require('./serverCode/getAnimalTypes');

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

});

app.get('/getAnimalTypes', getAnimalTypes(token));

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});
