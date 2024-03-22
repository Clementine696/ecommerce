import { categoryConstants } from "../actions/constants";

const initState = {
    categories : [],
    loading: false,
    error: null
};

const buildNewCategories = (parantId, categories, category) => {
    let myCategories = [];

    if(parantId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for(let cat of categories){

        if(cat._id == parantId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parantId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parantId, cat.children, category) : []
            })
        }
    }

    return myCategories;
}

export default (state = initState, actions) => {
    switch(actions.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: actions.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            // Updated the show category list
            const category = actions.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category)
            console.log(updatedCategories)

            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
    }

    return state;
}