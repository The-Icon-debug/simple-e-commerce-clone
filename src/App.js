import React from 'react';
import Home from './components/Home';
import Footer from './components/Footer'
import AddProduct from './components/AddProduct';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path="/addproduct" element={<AddProduct/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
    </Router>
    
  );
}

export default App;
