const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8002;
app.set('port', PORT);

const getKey = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
}

const signToken = (payload, key) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, (err, token) => {
            if(err){
                reject(err);
            }

            resolve(token);
        });
    });
}


app.get('/', async (req, res, next) => {
    const key = await getKey('./jwtrsa-private.key');
    const token = await signToken({user: 'rtdfg-12jhgt-652537j'}, key);
    res.json({token});
});

app.listen(app.get('port'), (err) => {
    if(err) {
        console.log('Server can\'t start.')
    }

    console.log(`Server running on port: ${app.get('port')}`);
});