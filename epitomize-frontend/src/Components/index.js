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
import OtherPosts from './OtherPosts';
import AllUsers from './AllUsers';
import Users from './Users'

const Components = () => {
    return(
        <Router>
            <Routes>
            <Route path = "/create" element={<CreatePost />} />
            <Route path = "/myposts" element={<Posts />}  />
            <Route path = "/alluser" element={<AllUsers />} />
            <Route path = "/edit/:id" element={<EditPosts />} />
            <Route path = "/post/:id" element={<Post />} />
            <Route path = "/signin" element={<SignIn />} />
            <Route path = "/" element={<OtherPosts />} />
            <Route path = "/users" element={<Users />} />
            </Routes>
        </Router>
    );
};

export default Components;