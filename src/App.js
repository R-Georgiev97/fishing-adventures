import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
// import Login from './components/Login/Login';

function App() {
  return (
      <AuthProvider>
        <Container fixed>
          <Header/>

          {/*<main id="main-content">*/}
          {/*  <Routes>*/}

          {/*    <Route path="/login" element={<Login />} />*/}
          {/*  </Routes>*/}
          {/*</main>*/}

        </Container>
      </AuthProvider>
  );
}

export default App;
