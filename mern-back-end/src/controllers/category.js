const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid')

function createCategories(categories, parentId = null){

    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }
    
    return categoryList;
    // return "Yahoo";
};

exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        // slug: slugify(req.body.name)
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }
    
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    
    const cat = new Category(categoryObj);

    cat.save().then(category => {
        category === cat; // true
        // if(error) return res.status(400).json({ error })

        if(category){
            return res.status(201).json({ category });
        }

    }).catch((error) => {
        return res.status(400).json({ error })
        console.log(err);
        // res.send(400, "Bad Request");
    });
    
}

exports.getCategory = (req, res) => {
    Category.find({})
    .then((categories) => {
        // if(error) return res.status(400).json({ error })

        if(categories){

            const categoryList = createCategories(categories);

            return res.status(200).json({ categoryList });
        }
        
    }).catch((error) => {
        console.log('ERROR HEREEEEEEEEEEEE');
        return res.status(400).json({ error })
        // console.log(err);
        // res.send(400, "Bad Request");
    })
}

exports.updateCategories = async (req, res) => {

    const {_id, name, parentId, type} = req.body;
    const updatedCategories = [];
    if(name instanceof Array){
        for(let i=0; i<name.length; i++){
            // console.log("UPDATE")
            // console.log(name[i], parentId[i])
            const category = {
                name: name[i],
                type: type[i]
            };
            // console.log()
            // if(parentId[i] === 'select category'){
            //     console.log("Get1")
            //     category.parentId = "";
            // }
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updatedCategories: updatedCategories   });
    }else{
        const category = {
            name,
            type
        };
        if(parentId !== ""){
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});
        return res.status(201).json({ updatedCategory });
    }

    // res.status(200).json({body: req.body});
}

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for(let i=0; i<ids.length; i++){
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id})
        deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length == ids.length){
        res.status(201).json({message: 'Categories removed'})
    }else{
        res.status(400).json({message: 'Something went worng'})
    }
    // res.status(200).json({body: req.body});
}