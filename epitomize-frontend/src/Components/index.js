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

const Components = () => {
    return(
        <Router>
            <Routes>
            <Route path = "/create" element={<CreatePost />} />
            <Route path = "/" element={<Posts />}  />
            <Route path = "/edit/:id" element={<EditPosts />} />
            <Route path = "/post/:id" element={<Post />} />
            </Routes>
        </Router>
    );
};

export default Components;