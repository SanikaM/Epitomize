# Sprint 3

In Sprint 3 the following user stories were successfully implemented:

1.  As a user, I should be able to register.

-   In this user story, the user has the ability to register themselves to the application.

2.  As a user, I should be able to login.

-   In this user story, the user has the ability to log in to the application.

3.  As a user, I should be able to logout.

-   In this user story, the user has the ability to logout from the application.

4.  As a user, I should be able to follow other users.

-   In this user story, the user has the ability to follow other users.

5.  As a user, I should be able to unfollow other users.

-   In this user story, the user has the ability to unfollow other users.

6.  As a user, I should be able to view the posts of people I follow.

-   In this user story, the user has the ability to view the posts of all the users that they follow.

7.  As a user, I should be able to view the posts of preferred tags.

-   In this user story, the user has the ability to view the posts of all tags that they prefer. These preferred tags are submitted by the user while they are registering to the system.

8.  As a user, I should be able to view own posts.

-   In this user story, the user has the ability to view their own posts by clicking the my post option in the avatar menu.

9.  As a user, I should be able to search posts.

-   In this user story, the user has the ability to search the whole system for posts by typing any word. The user will be shown the results containg their own posts or others as well.

10.  As a user, I should be able to see my own profile.

-   In this user story, the user has the ability to view their own profile which shows them their username, email, about and profile picture.

11.  As a User, I should be able to view list of other users.

-   In this user story, the user has the ability to view the list of all users in the system. A few of the users are shown in the sidebar and on clicking see more suggestions the user can see rest of the users as well.

## Backend:

#### 1. Login User API

This API is used for user login.

```
PUT  /login
```

#####  Example Request Body:

```
{
    "Emailid":"test@test.com",
    "Password":"pass"
}
```

##### Example Responses:

```
{
    "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InMucGFyaWtoQHVmbC5lZHUiLCJVc2VyaWQiOjIsImV4cCI6MTY0ODgzODE2MH0.N6KzeI3T5pfJycYpdoTlr_Dr4jpKYbiXK-Z_64BYFec",
    "Email": "test@test.com",
    "Result": "Successfully logged in.",
    "UserName": "test"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 2. Follow User API

This API allows user to follow other users and this foolowed user are linked with current users.

```
GET  /follow/{userid}
```
##### Header:

    Authorization: Access token
##### Example Response Body:

```
{	
    "result": "Created"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

####  3. Get UnFollow API

This API is used to unfollow a user that current user wants to remove connection with followed user.

```
GET  /unfollow/{userid}
```
##### Header:

    Authorization: Access token
##### Example Responses:

```
{	
    "result": "Created"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

####  4. Get UserList API

This API is used to get list of all users except the current user. As this list is used by user to foolow or unfollow other user's.

```
GET  /userlist
```
##### Header:

    Authorization: Access token
##### Example Responses:

```
{
    "Users": [
        {
        "UserId": 1,
        "Username": "test",
        "About": "about test",
        "Follow": 0
        }
    ]
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

####  5. Get User's Own Post API

This API is used to show all post created by the user.

```
GET  /post
```


##### Header:

    Authorization: Access token

##### Example Response:

```
{
    "Posts": [
        {
        "PostsUId": 2,
        "Type": "Blockchain kj",
        "Title": "Trade on Margin with 0% Interest jnkdv dcsac cjhdsbv",
        "Summary": "Get up to 5x leverage with 0% interest ",
        "Content": "Last year we launched Margin Trading on the Blockchain.com Exchange, giving users in over 150 supported countries the ability to trade  with up to 5x leverage.",
        "Linked_Post": 0,
        "Status": "Draft",
        "CreatedAt": "2022-03-30T17:55:08.115856-04:00",
        "UpdatedAt": "2022-03-30T17:55:08.115856-04:00",
        "TagList": [
            "crypto",
            "bitcoin"
            ],
        "Tags": "Crypto,Bitcoin"
        }
    ]
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

####  6. Get SearchPost  API

This API is used to get all the post searched by user.

```
POST /search
```
#####  Example Request Body:

```
{
    "Text": "movie"
}
```

##### Header:

    Authorization: Access token
##### Example Responses:

```
{
    "Posts": [
        {
        "PostsUId": 3,
        "Type": "Moview",
        "Title": "Food",
        "Summary": "Get up to 5x leverage with 0% interest ",
        "TagList": [
            "crypto",
            "bitcoin"
            ]
        }
    ]
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

# Front-end Features and Usage

### Register Page

### Login Page
This page is used to log in the user to the application. The following information is required from the user:

- Email Address - Email of the user
- Password - Password of the user

The user's email and password are verified on the backend and if the user gets verified then the access token is stored in the cookies which are used for authorization for other endpoints.

### User Profile Page

### User's own Posts Page
This page shows all the posts created by the user. The user has the option to edit or delete these posts as well as view the content of the post by clicking on them.

### Logout
The user can logout of the application by clicking the logout button. When the user log outs then the cookie is cleared. 

### List of users
This page displays the list of users showing the username and about of each user. The list does not contain the current user and the current user gets the option to follow/unfollow every user. A few users are displayed in the sidebar. 

### Follow User
The current user can follow any other user from the list of users and gets an alert message when the operation is successful. Once the user follows another user, then the current user can see the posts of that user, if any, immediately on the dashboard under the following tab.

### Unfollow User
The current user can unfollow any other user from the list of users and gets an alert message when the operation is successful. Once the user unfollows another user, then the current user can no longer see the posts of that user, if any.

### Posts of Following Users

### Posts of Preferred Tags

### Search Posts
The current user can use the search functionality to search for posts. The results contains all those posts whose title, or summary matches the search word. These results contain the posts of the current user as well all the other users in the system. 

## Front-end tests

### Unit Tests (Using JTest)

To run the unit test, following command is to be used -

  

    npm test

To run all tests enter "a", to quit enter "q".
  
The following tests are added in Sprint3:

1. Signin User - In this test we check all the components of the signin functionality are being displayed.

2. Signup User - In this test we check all the components of the signup functionality are being displayed.



### Functional Tests (Using Cypress)

To run the Functional tests, we run the following command -

    npx cypress open  
    
The following tests are added in Sprint3:

1. Register test- In this test, we are checking if a new user is successfully registered. We also create another user to test the follow-unfollow functionality.

2. Login test - In this test, we are checking if the created user is succesfully logged in.

3. User Profile test - In this test, we are checking the profile of the user created above.

4. Follow user test - In this test, we follow the other user created while registering and test the follow functionality.

5. Unfollow user test - In this test, we unfollow the other user created while registering and test the unfollow functionality.
6. Logout test - In this test, we logout the current user to show the signin page.

![](CypressTest.gif)


