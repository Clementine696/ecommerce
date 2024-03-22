import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import productReducers from "./product.reducers"
import categoryReducers from "./category.reducers"
import orderReducers from "./order.reducers"

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    product: productReducers,
    category: categoryReducers,
    order: orderReducers
});

export default rootReducer;

// export default (state = {name: 'Riz'}, action) => {
//     return state;
// }