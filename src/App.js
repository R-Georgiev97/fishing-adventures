import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PrivateRoute from './components/common/PrivateRoute';
import GuestRoute from './components/common/GuestRoute';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import * as React from 'react';
import AllRivers from './components/Rivers/AllRivers/AllRivers';

function App() {
  return (
      <AuthProvider>
        <Container fixed>
          <Header/>

          <main id="main-content">
            <Routes>
              <Route element={<GuestRoute/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
              </Route>

              <Route path="/home" element={<Register/>}/>
              <Route path="/" element={<Register/>}/>
              <Route path="/rivers" element={<AllRivers/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path="/logout" element={<Logout/>}/>
              </Route>
            </Routes>
          </main>

        </Container>
      </AuthProvider>
  );
}

export default App;
