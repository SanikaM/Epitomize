//file: src/Components/index.js

import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import Posts from './Posts'
import CreatePost from './CreatePost'
import EditPosts from './EditPost'
import Post from './Post'
import SignIn from './Signin';
import Tags from './Tags'

const Components = () => {
    return(
        <Router>
            <Routes>
            <Route path = "/create" element={<CreatePost />} />
            <Route path = "/" element={<Posts />}  />
            <Route path = "/" element={<Tags />}  />
            <Route path = "/edit/:id" element={<EditPosts />} />
            <Route path = "/post/:id" element={<Post />} />
            <Route path = "/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
};

export default Components;