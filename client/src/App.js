import React, { useContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const {user} = useContext(Context)

  return (
    <BrowserRouter> 
    <NavBar/>
    <AppRouter/> 
    <Footer/>
  </BrowserRouter>
  );
});

export default App;
