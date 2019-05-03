
const getAnimalTypes = (AnimalTypes, resp)=>{
    return ()=>{
        resp.set({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
            'Content-Length': AnimalTypes.length,
        });
        resp.json(AnimalTypes);
    };
};

module.exports = getAnimalTypes;
