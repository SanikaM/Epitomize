# Sprint 1

In Sprint 1 the following user stories were successfully implemented:
1. As a user, I should be able to create a new post feature.
	* In this user story, the user has the ability to create new posts by providing the post's title, summary, tags, type, and content.
2. As a user, I should be able to view the list of posts.
	* In this user story, the user has the ability to view the list of posts the user has created. Each item in the list contains the post's title, summary, tags and the date it was created. 
3. As a user, I should be able to edit the post.
	* In this user story, the user has the ability to edit a post. The user can edit the post's title, summary, content, and tag but not the type of the post.
4. As a user, I should be able to delete a post.
	* In this user story, the user has the ability to delete the post.

## Video Demo Link

https://drive.google.com/file/d/1JQ3h65-LKTYs6ZUlJprnTckoYmYwV7Ms/view?usp=sharing

Frontend: https://drive.google.com/file/d/13ZHzFeZJPTB7dyNaNAfVZxnxzmHLGz3H/view?usp=sharing

Backend: https://drive.google.com/file/d/1sdfFOsT047y7BAdDZ0r0gWQhf5cyAoHI/view?usp=sharing 

# Back-end DataBase Schema and APIs

### Database Design

 **1. Post Table**

Post table is important table for the site, as it stores all the posts data created by the user. The post table schema: 

   

    CREATE TABLE Post(
	        PostsUId int, `gorm:"primaryKey;auto_increment;not_null"` 
	        Type string,
	        Summary string
	        Content string
	        Linked_Post uint
	        Status string
	        CreatedAt time.Time
	        UpdatedAt time.Time
	        TagList pq.StringArray `gorm:"type:text[]"`
	        Tags string
        )

 **2. Tag Table**

We have also created Tag table to store the customize tags associated with posts created by users.

     CREATE TABLE Tag(
	     TagUId uint  `gorm:"primaryKey;auto_increment;not_null"` 
	     Type string  `gorm:"unique"`
    )

 **3. PostTag Table**

We have created the PostTag table to link the post created by the users and its appropriate tags .

    CREATE TABLE PostTag(
	    PostTagID uint  `gorm:"primaryKey;auto_increment;not_null"` 
	    PostId uint  `gorm:"foreignKey:PId"`
	    TagId uint  `gorm:"foreignKey:TId"`
    )

### APIs
 

 **1. Get Post API**

This API is get all the posts present in the database along with tags present in each post.

    GET /post

 
 #### Example Request:

    GET  /post

Responses contains all the posts in the database.

#### Example Response:

    {
       "Posts":[
          {
             "PostsUId":1,
             "Type":"Blog",
             "Title":"Go",
             "Summary":"GoLang",
             "Content":"Content",
             "Linked_Post":0,
             "Status":"Draft",
             "CreatedAt":"2022-02-04T13:24:29.270929-05:00",
             "UpdatedAt":"2022-02-04T13:24:29.270929-05:00",
             "TagList":[
                "Frontend",
                "Backend",
                "Database"
             ]
          }
       ]
    }
#### Status Codes:

 1.   **200**: No error
 2.   **500**: Internal Server Error



 **2. Delete Post  API**

This API is used to delete any post that user don't want it in his dashboard.

 #### Example Request:

     DELETE /deleteposts/{id}

id is the post's unique id that user wants to be deleted.

#### Example Request:


     DELETE /deleteposts/2

#### Example Response:

    {
	    result: "Successfully Deleted"
    }

#### Status Codes:

-   **200**: No error
-   **500**: Internal Server Error


#### 3. Create new Post API
This API creates a new Post

    POST  /post

#### Example Request:

    {	
        "Type": "Blockchain", 
        "Title": "Trade on Margin with 0% Interest",
        "Summary": "Get up to 5x leverage with 0% interest ",
        "Content": "Last year we launched Margin Trading on the Blockchain.com Exchange, giving users in over 150 supported countries the ability to trade with up to 5x leverage.",
        "Linked_Post": 0,
        "Status": "Draft",
        "Tags": "Crypto,Bitcoin"
    }

#### Example Responses:

    {
        "result": "Created"
    }


#### Status Codes:

-   **200**: No error
-   **500**: Internal Server Error


#### 4. TopTags API
This API is used to display top tags to user

 GET  /topTags

#### Example Request:
{
}

#### Example Responses:

    {
    "TagList":["Backend","S3","Amazon Web Service","Frontend","Distributed Systems","Golang","EC2","Crypto","BlockChain","Finance","United States","Database"]
    }

#### Status Codes:

-   **200**: No error
-   **500**: Internal Server Error



# Front-end Features and Usage
## Posts
### Create New Post Page

This page asks for user information regarding creating a new post. Below information is requested -
* Title - User needs to specify the title of the post
* Summary - Basic summary of the post
* Tell your story - Here the user will specify the actual content of the post
* Type - The post can be of type blog, story, article, etc.
* Tags - User can attach the post with tags which can help to categorize the posts and help users search the posts based on the tags.

The user can also link the post with an image. And once the user states all the information, he publishes the post by clicking on the 'Publish' button.


### Edit Post Page

The user can select a specific post from the list of posts and edit it. The initial values of all the fields will appear in the form and the user can update them. Once the update is done, the user needs to publish and the changes will be saved. Below are the fields that can be edited.

* Title - User can edit the title of the post.
* Summary - Basic summary of the post can be edited.
* Tell your story - The content of the post can be edited.
* Tags - User can attach more tags or delete existing tags.


### View Posts Page

The list of all posts created by the user is visible on this page. For every post, the user can see the post's title, summary, the date it was created, and the tags associated with that post. The user has the ability to edit or delete a post as well.

### Delete a Post 

While viewing all the posts lists, the option to delete a post is available. On clicking the delete icon, the post will be deleted from the database.
 
