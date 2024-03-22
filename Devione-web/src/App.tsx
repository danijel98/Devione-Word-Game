import './App.css';
import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './route/PrivateRoute';
import Home from './components/home/Home';
import Login from './components/auth/login/Login';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import Register from './components/auth/register/Register';

function App() {

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
