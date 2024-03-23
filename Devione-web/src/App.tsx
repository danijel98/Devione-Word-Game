import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './route/PrivateRoute';
import { ToastContainer } from 'react-toastify';

import Home from './components/home/Home';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
