import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import PostDetails from "./components/PostDetails/PostDetails";
import Container from "@mui/material/Container";
import {getLocalStorageUser} from './components/Utilities/UtilsJS/UtilJS';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//https://dummyapi.io/explorer this is pretty cool
//https://stackoverflow.com/questions/57344795/change-in-redux-state-does-not-cause-change-in-component-componentdidupdate-no
//https://blog.avada.io/css/color-palettes#flattastic-pro-color-palettes-rodriguesmarcos

//for all future styling
//https://www.youtube.com/watch?v=B7rDus0sMRw&ab_channel=TheCleverDev
//check this out, we will create another js file next to the components
//just create e.g const gridStyles = { padding:'20px',bg:'red'..etc}
//then on our <grid> we say <grid sx={gridStyles}
//instead of having it inline

function App() {
  const user = getLocalStorageUser();

  return (
    <BrowserRouter>
      <Container maxWidth="xl" sx={{ backgroundColor: "#f7f8fc" }}>
        <Navbar/>
        <Routes>
          <Route exact path="/auth" element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
          <Route exact path="/" element={<Navigate replace to="/posts" />} />
          <Route exact path="/posts"  element={<Home />} />
          <Route exact path="/posts/:id"  element={<PostDetails />} />
          <Route exact path="/profile/:id" element={<Profile/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
