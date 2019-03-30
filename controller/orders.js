const Order = require('../models/order');
const Product = require('../models/product');

exports.get_orders_Render = (req, res) => {
    Order.find({googleId: req.user.googleId})
        .select('id product googleId')
        .exec()
        .then(docs => {
            const response = {
                OrderList: docs.map(doc => {
                    return {
                        id: doc.id,
                        product: doc.product,
                        googleId: doc.googleId,
                    }
                })
            };
            res.render('orders', {user: req.user, myData: response});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.get_order_Render = (req, res) => {
    res.render('addOrder', {user: req.user});
};

exports.post_order_Render = (req, res) => {

    const productId = req.body.productId;
    const userGoogleId = req.user.googleId;
    if(productId.length===24){
        Product.findById(productId)
            .exec()
            .then(searchResult => {
                if (!searchResult) {
                    console.log('produkt nie istnieje!!');
                } else {
                        const order = new Order({
                            product: productId,
                            googleId: userGoogleId
                        })
                            .save()
                            .then(result => {
                                console.log('zrobiono nowe zamowienie! ' + result);
                            });
                    // console.log(productId+"\n"+userGoogleId);
                }
            })
            .catch(err => {
                console.log('blad szukania produktu po id');
            });
    }else {
        console.log('niepoprawne ID produktu!');
    }
    res.redirect('/orders/addOrder');






    // const idToFind = req.body.productId;
    // Product.findById(idToFind)
    //     .then(product => {
    //         if (!product) {
    //             console.log('produkt nie znaleziony!');
    //         }
    //         const order = new Order({
    //             googleId: req.user.googleId,
    //             product: req.body.productId
    //         });
    //         return order
    //             .save()
    //             .then(resultAfterSave=>{
    //                 console.log('zapisano nowe zamowienie!\n'+resultAfterSave);
    //             })
    //     })
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // res.redirect('/orders/addOrder/add');
};