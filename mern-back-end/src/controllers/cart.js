const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id }).then(cart => {
        console.log(cart)
        if(cart){
            // if cart already exist then update cart by quantity
            console.log('update cart')
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product)
            let condition, action;

            if(item){
                condition = { user: req.user._id, "cartItems.product": product };
                action = {
                    "$set" : {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };
            }else{
                condition = { user: req.user._id };
                action = {
                    "$push" : {
                        "cartItems": req.body.cartItems
                    }
                };
            }

            Cart.findOneAndUpdate(condition, action).then(_cart => {
                if(_cart){
                    res.status(201).json({ message: _cart})
                }
                }).catch((error) => {
                    return res.status(400).json({ error })
                });

        }else{
            // if cart not exist, craete new cart
            console.log('new cart')
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save().then(cart => {
                if(cart){
                    return res.status(201).json({ cart });
                }
        
            }).catch((error) => {
                return res.status(400).json({ error })
            });
        
        }
    }).catch((error) => {
        return res.status(400).json({ error })
    });

};




// exports.addItemToCart = (req, res) => {

//     Cart.findOne({ user: req.user._id }).then(cart => {
//         console.log(cart)
//         if(cart){
//             // if cart already exist then update cart by quantity
//             console.log('update cart')
//             const product = req.body.cartItems.product;
//             const item = cart.cartItems.find(c => c.product == product)
//             let condition, action;

//             if(item){
//                 console.log('update increase')
//                 Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
//                     "$set" : {
//                         "cartItems.$": {
//                             ...req.body.cartItems,
//                             quantity: item.quantity + req.body.cartItems.quantity
//                             }
//                         }
//                     })
//                     .then(_cart => {
//                         if(_cart){
//                             res.status(201).json({ message: _cart})
//                         }
//                     }).catch((error) => {
//                         return res.status(400).json({ error })
//                     });
//             }else{
//                 console.log('update new item')
//                 Cart.findOneAndUpdate({ user: req.user._id }, {
//                     "$push" : {
//                         "cartItems": req.body.cartItems
//                     }
//                     }).then(_cart => {
//                         if(_cart){
//                             res.status(201).json({ message: _cart})
//                         }
//                     }).catch((error) => {
//                         return res.status(400).json({ error })
//                     });
//             }

//         }else{
//             // if cart not exist, craete new cart
//             console.log('new cart')
//             const cart = new Cart({
//                 user: req.user._id,
//                 cartItems: [req.body.cartItems]
//             });
        
//             cart.save().then(cart => {
//                 if(cart){
//                     return res.status(201).json({ cart });
//                 }
        
//             }).catch((error) => {
//                 return res.status(400).json({ error })
//             });
        
//         }
//     }).catch((error) => {
//         return res.status(400).json({ error })
//     });

// };