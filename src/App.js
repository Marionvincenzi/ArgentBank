import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store"
import "./styles/main.css"

import Header from './components/header/Header';
import Footer from './components/footer/Footer'

import Home from "./pages/Home";
import Login from './pages/Login';
import Profil from './pages/Profil';

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profil/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
