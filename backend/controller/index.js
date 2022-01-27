const Item = require('../models/items');
const Product = require('../models/product');

const addItem = (req, res) => {
    if (req.body.name && req.body.amount && req.body.category) {
        const newItem = new Item({
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category
        });

        newItem.save((err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(409);
            } else {
                res.status(200).json({
                    message: "Registered with success"
                })
            }
        })
    } else {
        res.status(422).json({
            message: "Please provide all data for register process"
        })
    }
}

const get_items = (req, res) => {
    Item.find({}, (err, docs) => {
        if (err) res.status(500);
        if (docs) res.send(docs);
    })
}

//get item by name
const getItem = (req, res) => {
    Item.findOne({name: req.params.name}, (err, doc) => {
        if (err) res.status(500);
        if (doc === null) res.status(404).send("not found");
        if (doc) res.send(doc);
    })
}

const deleteItem = (req, res) => {
    if (req.params.id) {
        Item.deleteOne({
            _id: req.params.id
        }).then(function () {
            console.log("Data deleted"); // Success
            res.status(200);
        }).catch(function (error) {
            console.log(error); // Failure
            res.status(500);
        });
    } else {
        res.status(422).json({
            message: "Please provide all data"
        })
    }
}

const updateItem = async (req, res) => {
    const doc = await Item.findOne({
        _id: req.body._id
    });
    if (req.body.name) {
        doc.name = req.body.name;
    }
    if (req.body.amount) {
        doc.amount = req.body.amount;
    }
    if (req.body.category) {
        doc.category = req.body.category;
    }
    doc.save();
}

/// product functions

const addProduct = (req,res) => {
        if (req.body.name && req.body.code && req.body.category) {
            const newProduct = new Product({
                name: req.body.name,
                category: req.body.category,
                code: req.body.code
            });
    
            newProduct.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(409);
                } else {
                    res.status(200).json({
                        message: "Registered with success"
                    })
                }
            })
        } else {
            res.status(422).json({
                message: "Please provide all data for register process"
            })
        }
}

const getProduct = (req,res) => {
    if (req.params.code){
        Product.findOne({code: req.params.code}, (err, doc) => {
            if (err) res.status(500);
            if (doc === null) res.status(404).send("not found");
            if (doc) res.send(doc);
        })
    }
}

module.exports = {
    addItem,
    deleteItem,
    get_items,
    getItem,
    updateItem,
    addProduct,
    getProduct
}