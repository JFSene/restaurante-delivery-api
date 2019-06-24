
import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';
import bodyParser from 'body-parser';

export default({ config, db }) => {
let api = Router();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// '/v1/restaurant/add
api.post('/add', urlencodedParser, (req, res) => {
    console.log(`Requisiton's Body: ${req.body.city}, ${req.body.name}`);
    let newRest = new Restaurant();
    newRest.name = req.body.name;
    newRest.city = req.body.city;

    newRest.save(err => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Restaurant salvo' });
    });
});

// '/v1/restaurant'
api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurants);
    });
});

// 'v1/restaurant/:id''
api.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurant);
    });
});

// '/v1/restaurant/:id'
api.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        restaurant.name = req.body.name;
        restaurant.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant info updated'});
        });
    });
});

// '/v1/restaurant/:id'
api.delete('/:id', (req, res) => {
    let myQuery = { _id: req.params.id };
    Restaurant.deleteOne({
        myQuery
    }, (err, restaurant) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Restaurant deleted'} );
    });
});

return api;
}