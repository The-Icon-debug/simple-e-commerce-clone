import React from 'react';
import Home from './components/Home';
import Footer from './components/Footer'
import AddProduct from './components/AddProduct';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Routes, Route, HashRouter} from 'react-router-dom'

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path="/addproduct" element={<AddProduct/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
    </HashRouter>
    
  );
}

export default App;
