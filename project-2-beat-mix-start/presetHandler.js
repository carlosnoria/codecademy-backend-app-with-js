// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (method, index, arrayPreset) => {
    if (index < 0 || index > presets.length){
        return [404];
    }
    
    if(method != 'GET' && method != 'PUT'){
        return [400];
    }

    let result = [200];

    switch(method) {
        case 'PUT':
            presets[index] = arrayPreset;
        case 'GET':
            result.push(presets[index]);
            break;
    }

    return result;

};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
