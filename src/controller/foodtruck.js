
import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import bodyParser from 'body-parser';
import Review from '../model/review';

export default({ config, db }) => {
let api = Router();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// '/v1/foodtruck/add
api.post('/add', urlencodedParser, (req, res) => {
    console.log(`Requisiton's Body: ${req.body.city}, ${req.body.name}`);
    let newFoodtruck = new FoodTruck();
    newFoodtruck.name = req.body.name;
    newFoodtruck.foodtype = req.body.foodtype;
    newFoodtruck.avgcost = req.body.avgcost;
    newFoodtruck.geometry.coordinates = req.body.geometry.coordinates;

    newFoodtruck.save(err => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Foodtruck salvo' });
    });
});

// '/v1/foodtruck'
api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodTrucks) => {
        if (err) {
            res.send(err);
        }
        res.json(foodTrucks);
    });
});

// 'v1/foodtruck/:id''
api.get('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodTruck) => {
        if (err) {
            res.send(err);
        }
        res.json(foodTruck);
    });
});

// '/v1/foodtruck/:id'
api.put('/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
        if (err) {
            res.send(err);
        }
        foodtruck.name = req.body.name;
        foodtruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant info updated'});
        });
    });
});

// '/v1/foodtruck/:id'
api.delete('/:id', (req, res) => {
    let myQuery = { _id: req.params.id };
    FoodTruck.deleteOne({
        myQuery
    }, (err, foodtruck) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Restaurant deleted'} );
    });
});

// add review for specific foodtruck
// '/v1/foodtruck/reviews/add/:id'

api.post('/reviews/add/:id', (req, res) => {
    FoodTruck.findById(req.params.id, (err, foodtruck) => {
        if (err) {
            res.send(err);
        }

        let newReview = new Review();
        newReview.title = req.body.title;
        newReview.text = req.body.text;
        newReview.foodtruck = foodtruck._id;
        newReview.save((err, review) => {
            if (err) {
                res.send(err);
            }

            foodtruck.reviews.push(newReview);
            foodtruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Foodtruck review saved!" });
            });
        });
    });
});

//get reviews for a specific foodtruck
// '/v1/foodtruck/reviews/:id'
api.get('/reviews/:id', (req, res) => {
    Review.find({ foodtruck: req.params.id}, (err, reviews) => {
        if (err) {
            res.send(err);
        }
        res.json(reviews);
    });
});

return api;
}