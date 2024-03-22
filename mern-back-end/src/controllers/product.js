const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/category')

exports.createProduct = (req, res) => {

    // res.status(200).json( {file: req.files, body: req.body} );

    const {
        name, price, quantity, description, category
    } = req.body;

    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: req.body.name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy: req.user._id
    });

    product.save().then(product => {
        if(product){
            res.status(201).json({ product });
        }
    }).catch((error) => {
        return res.status(400).json({ error })
        console.log(err);
        // res.send(400, "Bad Request");
    });
    
}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .then(category => {
            if(category){
                Product.find({ category: category._id })
                    .then(products => {
                        if(products.length > 0){
                            res.status(200).json({
                            products,
                            productByPrice: {
                                under5k: products.filter(product => product.price <= 5000),
                                under10k: products.filter(product => product.price > 5000 && product.price <=10000),
                                under15k: products.filter(product => product.price > 10000) 
                                }
                            })
                        }else{
                            res.status(200).json({ message: 'no' })
                        }
                    }).catch((error) => {
                        return res.status(400).json({error})
                    })
            }
        }).catch((error) => {
            return res.status(400).json({error})
        })
}


