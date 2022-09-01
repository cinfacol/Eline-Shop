import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from '../containers/Home';
import Dashboard from '../containers/pages/Dashboard';
import Login from '../containers/pages/Login';
import Signup from '../containers/auth/Signup';
import Activate from '../containers/auth/Activate';
import Error404 from '../containers/errors/Error404';
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404 />} />

          <Route exact path='/' element={<Home />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
