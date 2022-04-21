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
import SignUp from './Signup';
import UserProfile from './UserProfile';
import Drafts from './Drafts';
import ReadingList from './ReadingList';
import Notifications from './Notifications';
import OtherUserProfile from './OtherUserProfile';
import TagsPosts from './TagsPosts';
import Draft from './Draft';

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/create" element={<CreatePost />} />
                <Route path="/myposts" element={<Posts />} />
                <Route path="/alluser" element={<AllUsers />} />
                <Route path="/edit/:id" element={<EditPosts />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<OtherPosts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/mydrafts" element={<Drafts />} />
                <Route path="/myreadinglist" element={<ReadingList />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/user/:id" element={<OtherUserProfile />} />
                <Route path="/tagsposts/:tag" element={<TagsPosts />} />
                <Route path="/draft/:id" element={<Draft />} />
            </Routes>
        </Router>
    );
};

export default Components;