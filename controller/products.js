const Product = require('../models/product');

exports.get_products_Render = (req, res) => {
    Product.find()
        .select('id name price')
        .exec()
        .then(docs => {
            const response = {
                // count: docs.length,
                ProductsList: docs.map(doc => {
                    return {
                        id: doc.id,
                        name: doc.name,
                        price: doc.price
                    }
                })
            };
            res.render('products', {user: req.user, myData: response});
        })
        .catch(err => {
            console.log(err);
        });
    // res.render('products',{user:req.user});
};

exports.get_product_Render = (req, res) => {
    res.render('addProducts', {user: req.user});
};

exports.post_product_Render = (req, res) => {
    const nameOfProduct = req.body.productName;
    const priceOfProduct = req.body.productPrice;
    Product.find({name: nameOfProduct})
        .exec()
        .then(searchResult => {
            if (searchResult[0]) {
                console.log('produkt istnieje!!');
            } else {
                if (priceOfProduct.length < 1 || priceOfProduct < 1 || nameOfProduct.length < 1) {
                    console.log('zbyt mała wartosc ceny lub niepoprawna nazwa!');
                } else {
                    const product = new Product({
                        name: nameOfProduct,
                        price: priceOfProduct
                    })
                        .save()
                        .then(result => {
                            console.log('zrobiono nowy produk! ' + result);
                        });
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
    res.redirect('/products/addProducts');
};