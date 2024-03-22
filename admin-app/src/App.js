import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getInitialData, isUserLoggedIn } from './actions';
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      {/* <Home></Home> */}
      {/* <Signin></Signin> */}
        {/* <Router> */}
          <Routes>
            <Route path="/" exact element={<PrivateRoute> <Home/> </PrivateRoute>} />
            {/* <Route path="/" Component={<PrivateRoute><Home /></PrivateRoute>} /> */}
            {/* <PrivateRoute path="/" exact Component={Home} /> */}
            {/* <Route path="/" exact Component={Home} /> */}
            <Route path="/products" element={<PrivateRoute> <Products/> </PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute> <Orders/> </PrivateRoute>} />
            <Route path="/category" element={<PrivateRoute> <Category/> </PrivateRoute>} />
            <Route path="/signin" Component={Signin} />
            <Route path="/signup" Component={Signup} />
          </Routes>
        {/* </Router> */}
    </div>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" exact component={Home} />
//         <Route path="/signin" component={Signin} />
//         <Route path="/signup" component={Signup} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
