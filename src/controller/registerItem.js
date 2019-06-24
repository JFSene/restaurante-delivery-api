let mongoose = require('mongoose');
let Router = require('express');
let NewItem = require('../model/registerItem');
let bodyParser = require('body-parser');

export default({ config, db }) => {
    let api = Router();

    let urlEncodedParser = bodyParser.urlencoded({ extended: false });

    //CREATE NEW PRODUCT
    // '/v1/products/new
    api.post('/new', urlEncodedParser, (req, res) => {
        console.log(`Body: ${req.body.title}`);
        let newItem = new NewItem();
        newItem.title = req.body.title;
        newItem.description = req.body.description;
        newItem.availableSizes = req.body.availableSizes;
        newItem.imgURL = req.body.imgURL;
        newItem.price = req.body.price;
        newItem.observations = req.body.observations;
        newItem.additionals = req.body.additionals;

        newItem.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "New Item added successfully!" })
        });
    });

    // GET ALL PRODUCTS
    // '/v1/products/'
    api.get('/', (req, res) => {
        NewItem.find({}, (err, items) => {
            if (err) {
                res.send(err);
            }
            res.json(items);
        });
    });

    //GET SINGLE PRODUCT
    // '/v1/products/:id'
    api.get('/:id', (req, res) => {
        NewItem.findById(req.params.id, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    });

    //EDIT PRODUCT
    // '/v1/products/:id'
    api.put('/:id', (req, res) => {
        NewItem.findById(req.params.id, (err, editedItem) => {
            if (err) {
                res.send(err);
            }
            editedItem.title = req.body.title;
            editedItem.description = req.body.description;
            editedItem.availableSizes = req.body.availableSizes;
            editedItem.imgURL = req.body.imgURL;
            editedItem.price = req.body.price;
            editedItem.observations = req.body.observations;
            editedItem.additionals = req.body.additionals;

            editedItem.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Product info updated'});
            });
        });
    });

    return api;
}