const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playersDB', {useNewUrlParser: true},
    (err) => {
        if (err) console.log('db connection ERROR!');
        else console.log('db connection SUCCESSFUL!');
    });