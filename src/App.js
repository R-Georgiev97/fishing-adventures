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
import AllRivers from './components/Rivers/AllRivers';
import RiverDetails from './components/Rivers/RiverDetails';
import AllStories from './components/Stories/AllStories';
import AddStory from './components/Stories/AddStory';
import Home from './components/Home/Home';
import StoryDetails from './components/Stories/StoryDetails';
import StoryEdit from './components/Stories/StoryEdit';

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

              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/rivers" element={<AllRivers/>}/>
              <Route path="/rivers/:riverId" element={<RiverDetails/>}/>
              <Route path="/stories" element={<AllStories/>}/>
              <Route path="/stories/:storyId" element={<StoryDetails/>}/>
              <Route path="/stories/:storyId/edit" element={<StoryEdit/>}/>

              <Route element={<PrivateRoute/>}>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/stories/create" element={<AddStory/>}/>
              </Route>
            </Routes>
          </main>

        </Container>
      </AuthProvider>
  );
}

export default App;
