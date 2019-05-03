const https = require('https');

const makeOptions = (tokenThing, path)=>{
  console.log('Path will be :', path);
  return {
    method: 'GET',
    hostname: 'api.petfinder.com',
    path: path,
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
    console.log(`Token is: ${JSON.stringify(againToken)}`);
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
