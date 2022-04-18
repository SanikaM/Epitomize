## Backend:

#### 1. Upload Image API

This API is used for upload images for user profile picture.

```
POST  /uploadImage
```
##### Header:

    Authorization: Access token
#####  Example Request Body:

```
myfile = abc.png
```

##### Example Responses:

```
{
    "message": "Successfully Uploaded File"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 2. Get Uploaded Image API

This API is used to get user's profile picture.

```
GET  /uploadImage
```
##### Header:

    Authorization: Access token
##### Example Responses:

```
{
    "Image_path": "{username}/{imagename}"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 3. Get Single Draft  API

This API is used to get user's created single draft.

```
GET  /draft/{post_id}
```
##### Header:

    Authorization: Access token
##### Example Responses:

```
{
"PostsUId": 6,
"Type": "Movie",
"Title": "New Movie",
"Summary": "test",
"Content": "test",
"Linked_Post": 0,
"Status": "1",
"CreatedAt": "2022-04-13T20:11:07.945939-04:00",
"UpdatedAt": "2022-04-13T20:11:07.945939-04:00",
"Image": "",
"TagList": [
"Sad",
"Happy"
],
"Tags": "Sad,Happy"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 4. Get All Draft API

This API is used to get all drafts created by the user

```
GET  /draft
```
##### Header:

    Authorization: Access token

##### Example Responses:

```
{
    "Posts": [
{
"PostsUId": 6,
"Type": "Movie",
"Title": "New Movie",
"Summary": "test",
"Content": "test",
"Linked_Post": 0,
"Status": "1",
"CreatedAt": "2022-04-13T20:11:07.945939-04:00",
"UpdatedAt": "2022-04-13T20:11:07.945939-04:00",
"Image": "",
"TagList": [
"Sad",
"Happy"
],
"Tags": "Sad,Happy"
},
        {
"PostsUId": 5,
"Type": "Book",
"Title": "New Book",
"Summary": "test",
"Content": "test",
"Linked_Post": 0,
"Status": "1",
"CreatedAt": "2022-04-13T20:11:07.945939-04:00",
"UpdatedAt": "2022-04-13T20:11:07.945939-04:00",
"Image": "",
"TagList": [
"Sad",
"Happy"
],
"Tags": "Sad,Happy"
}
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable


#### 5. Convert Draft to Post API

This API is used to change post status from draft to post.

```
POST  /toPost/{post_id}
```
##### Header:

    Authorization: Access token

##### Example Responses:

```
{
"message" : "Draft convereted to Post"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 6. Get All Notifications API

This API is used to get all the notifications related to the user.

```
GET  /notification
```
##### Header:

    Authorization: Access token


##### Example Responses:

```
{
"AllNotifications": [
	{
		"NId": 8,
		"Userid": 1,
		"Message": "User {username} like your post {posttitle}",
		"Path": "/post/1",
		"CreatedAt": "2022-04-18T16:06:25.470515-04:00",
	"Read": 0
	}
  ]
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 7. Delete Notifications API

This API is used to delete a specific notification.

```
DELETE  /notification/{notificationid}
```
##### Header:

    Authorization: Access token


##### Example Responses:

```
{
"message" : "Notification Successfuly deleted"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 8. Read a Single Notifications API

This API is used to change read status of given notification.

```
GET  /notification/{notificationid}
```
##### Header:

    Authorization: Access token


##### Example Responses:

```
{
"message" : "Notification Successfuly read"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable

#### 9. Read a All Notifications API

This API is used to change read status of given notification.

```
GET  /allnotification
```
##### Header:

    Authorization: Access token


##### Example Responses:

```
{
"message" : "All Notification Successfuly read"
}
```

##### Status Codes:

-   **200**: Status OK
-   **400**: Bad Request
-   **500**: Internal Server Error
-   **503**: Service Unavailable
