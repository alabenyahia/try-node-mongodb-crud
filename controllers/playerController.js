const express = require('express');
const router = express.Router();
const playerModel = require('../models/player.model');


router.get('/all', ((req, res) => {
    playerModel.find().lean().exec((err, docs) => {
        console.log(docs, "DOOOOCS");
        if (err) console.log('Player Finding error', err);
        else res.render('layouts/player/listAll', {players: docs});
    });
}));

router.get('/:id', (req, res) => {
    playerModel.findById(req.params.id).lean().exec((err, docs) => {
        console.log(docs, "DOOOOCS");
        if (err) console.log('Player Finding error', err);
        res.render('layouts/player/addOrEdit', {title: 'Edit Player', player: docs});
    });
});

router.get('/delete/:id', (req, res) => {
    playerModel.findByIdAndDelete(req.params.id, (err, doc)=>{
        if (err) console.log("player deletion error", err);
        else res.redirect('/player/all');
    })
})


router.post('/', (req, res) => {
    addOrUpdatePlayer(req, res);
});

router.get('/', (req, res) => {
    res.render('layouts/player/addOrEdit', {title: 'Add Person', });
});

const addOrUpdatePlayer = (req, res) => {
    if (req.body.id) {
        playerModel.findByIdAndUpdate(req.body.id, req.body,{new: true, runValidators: true}, (err, docs) => {
            if (err) {
                if (err.name === 'ValidationError') {
                    handleValidation(err, req.body);
                    res.render('layouts/player/addOrEdit', {title: 'Edit Player', player: req.body})
                }
                else console.log("update error");
            }
            else res.redirect('/player/all');
        })
        console.log("player updated")
    } else {
        console.log("player added")
        const player = new playerModel();

        player.name = req.body.name;
        player.nationality = req.body.nationality;
        player.age = req.body.age;

        player.save((err) => {
            if (err) {
                console.log("errname", err.name);
                if (err.name === 'ValidationError') {
                    console.log("tagone");
                    handleValidation(err, req.body);
                    res.render('layouts/player/addOrEdit', {title: 'Add player', player: req.body});
                } else console.log("insertion error", err);
            } else res.redirect('/player/all');
        });
    }

}

const handleValidation = (err, body) => {
    for (let field in err.errors) {
        console.log('PATH', err.errors[field].path)
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'nationality':
                body['natError'] = err.errors[field].message;
                break;
            case 'age':
                body['ageError'] = err.errors[field].message;
                break;
        }
    }
}

module.exports = router;