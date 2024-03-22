import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
import Homepage from './containers/HomePage';
import ProductListPage from "./containers/ProductListPage";


// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Homepage />}></Route>
//       </Routes>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Homepage />}></Route>
          <Route path="/:slug" exact element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
