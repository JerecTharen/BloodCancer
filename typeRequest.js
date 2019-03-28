const https = require('https');

// const typeOptions = {
//     method: 'GET',
//     hostname: 'api.petfinder.com',
//     path: '/v2/types',
//     // method: 'POST',
//     headers: {
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         // 'Content-Length': data.length
//         'Authorization': ` Bearer ${TOKEN}`
//     }
// };

// const typeData = querystring.stringify({
//   'Authorization': `Bearer ${TOKEN}`,
// });

// const typeReq = https.request(typeOptions, (typeResp)=>{
//     console.log('In Type Request');
//     console.log(`Token is: ${TOKEN}`);
//     console.log(`Status Code: ${typeResp.statusCode}`);
//     typeResp.on('data', (types)=>{
//         console.log(JSON.parse(types));
//     });
// });

const makeOptions = (tokenThing)=>{
  return {
    method: 'GET',
    hostname: 'api.petfinder.com',
    path: '/v2/types',
    headers: {
        'Authorization': ` Bearer ${tokenThing}`
    }
  };
};

const createRequest = (createOptions, typeCallback)=>{
  return https.request(createOptions, typeCallback);
};

const createCallback = (againToken)=>{
  return (typeResp)=>{
    console.log('In Type Request');
    console.log(`Token is: ${againToken}`);
    console.log(`Status Code: ${typeResp.statusCode}`);
    typeResp.on('data', (types)=>{
        console.log(JSON.parse(types));
    });
  }
};

const typeExport = {
  req: createRequest,
  opt: makeOptions,
  call: createCallback
};

module.exports = typeExport;
