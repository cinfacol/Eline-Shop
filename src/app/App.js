import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';
import Dashboard from '../containers/pages/Dashboard';
import Login from '../containers/auth/Login';
import Signup from '../containers/auth/Signup';
import Activate from '../containers/auth/Activate';
import ResetPassword from '../containers/auth/ResetPassword';
import ResetPasswordConfirm from '../containers/auth/ResetPasswordConfirm';
import Error404 from '../containers/errors/Error404';
function App() {
  return (
    <Router>
      <Routes>
        {/* Error Display */}
        <Route path="*" element={<Error404 />} />

        <Route exact path='/' element={<Home />} />

        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/activate/:uid/:token' element={<Activate />} />
        <Route exact path='/reset_password' element={<ResetPassword />} />
        <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />

        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
