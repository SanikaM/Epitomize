package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"

	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"

	"github.com/pilinux/gorest/controller"
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var posts model.Post
var jwtKey = []byte("my_secret_key")

type Claims struct {
	Username string `json:"username"`
	Userid   uint
	jwt.StandardClaims
}

func GetReactionsUserList(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	users, responseType := controller.GetReactionsUserList(uint(postId))
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(users)
		return
	}
	http.Error(w, "Invalid request", http.StatusBadRequest)
}

func AddReactionToPost(w http.ResponseWriter, r *http.Request) {
	userId := Authentification(w, r)
	if userId == http.StatusUnauthorized || userId == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userId)), int(userId))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseType := controller.AddReaction(userId, uint(postId))
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func RemoveReactionFromPost(w http.ResponseWriter, r *http.Request) {
	userId := Authentification(w, r)
	if userId == http.StatusUnauthorized || userId == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userId)), int(userId))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseType := controller.RemoveReactionFromPost(userId, uint(postId))
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func GetReadingList(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	posts, responseType := controller.GetReadingList(userid)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(posts)
		return
	}
	http.Error(w, "Invalid request", http.StatusBadRequest)
}

func AddToReadingList(w http.ResponseWriter, r *http.Request) {
	userId := Authentification(w, r)
	if userId == http.StatusUnauthorized || userId == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userId)), int(userId))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseType := controller.AddToReadingList(userId, postId)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func RemoveFromReadingList(w http.ResponseWriter, r *http.Request) {
	userId := Authentification(w, r)
	if userId == http.StatusUnauthorized || userId == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userId)), int(userId))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseType := controller.RemoveFromReadingList(userId, postId)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func Authentification(w http.ResponseWriter, r *http.Request) uint {
	reqToken := r.Header.Get("Authorization")
	if len(reqToken) == 0 {
		w.WriteHeader(http.StatusUnauthorized)
		return http.StatusUnauthorized
	}
	splitToken := strings.Split(reqToken, "Bearer ")
	reqToken = splitToken[1]
	tknStr := reqToken
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return http.StatusUnauthorized
		}
		w.WriteHeader(http.StatusBadRequest)
		return http.StatusBadRequest
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return http.StatusUnauthorized
	}
	fmt.Println("userid", claims.Userid)
	return claims.Userid
}
func AllPostTest(w http.ResponseWriter, r *http.Request) {
	posts := controller.GetPosts(1, false)
	result := model.GetAllPost{
		Posts: posts,
	}
	json.NewEncoder(w).Encode(result)
}
func AllPost(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	fmt.Println(userid)
	posts := controller.GetPosts(userid, true)
	result := model.GetAllPost{
		Posts: posts,
	}
	json.NewEncoder(w).Encode(result)
}
func AllNotifications(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	fmt.Println(userid)
	result := controller.GetNotifications(userid)
	json.NewEncoder(w).Encode(result)
}
func AllDraft(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	fmt.Println(userid)
	posts := controller.GetDrafts(userid, true)
	result := model.GetAllPost{
		Posts: posts,
	}
	json.NewEncoder(w).Encode(result)
}
func display(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(code)
	user, _ := controller.GetUser(code)
	var result model.ProfilePicResponse
	result.Image_path = user.Profilepicture
	json.NewEncoder(w).Encode(result)
}
func uploadFile(w http.ResponseWriter, r *http.Request) {
	// Maximum upload of 10 MB files
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(code)
	user, _ := controller.GetUser(code)
	r.ParseMultipartForm(10 << 20)

	// Get handler for filename, size and headers
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}

	defer file.Close()
	fmt.Println("Hello")
	fmt.Println(handler.Filename)
	fmt.Println(user.Username)
	// Create file
	dir := "../epitomize-frontend/src/images"
	if _, err := os.Stat("../epitomize-frontend/src/images/" + user.Username); os.IsNotExist(err) {
		os.Mkdir("../epitomize-frontend/src/images/"+user.Username, 0700)
	}
	destination := dir + "/" + user.Username + "/" + handler.Filename
	dst, err := os.Create(destination)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer dst.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	filedst := user.Username + "/" + handler.Filename
	controller.UpdateProfilePicture(code, filedst)
	fmt.Fprintf(w, "Successfully Uploaded File\n")
}
func uploadHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		uploadFile(w, r)
	case "GET":
		display(w, r)
	}
}
func TopTagsTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	topTag, responseType := controller.GetTopTags(false)
	if responseType == http.StatusOK {
		result := make(map[string][]string)
		result["TagList"] = topTag
		json.NewEncoder(w).Encode(result)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}
func AllTags(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	topTag, responseType := controller.GetAllTags(true)
	if responseType == http.StatusOK {
		result := make(map[string][]string)
		result["TagList"] = topTag
		json.NewEncoder(w).Encode(result)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}
func TopTags(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	topTag, responseType := controller.GetTopTags(true)
	if responseType == http.StatusOK {
		result := make(map[string][]string)
		result["TagList"] = topTag
		json.NewEncoder(w).Encode(result)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}
func CreateNewPostTest(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&post)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	}
	responseType := controller.CreatePost(post, false)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func CreateNewUser(w http.ResponseWriter, r *http.Request) {
	var user model.User
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		errorResponse := controller.CreateUser(user)
		if errorResponse.HTTPCode == http.StatusOK {
			json.NewEncoder(w).Encode(errorResponse.Message)
			return
		}
		http.Error(w, errorResponse.Message, errorResponse.HTTPCode)
	}
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	user, responseType := controller.GetUser(userid)

	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(user)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	loggedInUserid := Authentification(w, r)
	if loggedInUserid == http.StatusUnauthorized || loggedInUserid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(loggedInUserid)), int(loggedInUserid))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	userId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	user, responseType := controller.GetUserProfile(uint(userId))

	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(user)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}

func SearchUserPostTest(w http.ResponseWriter, r *http.Request) {
	var search model.Search
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&search)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.SearchPost(search, false)
		result := model.GetAllSearchPost{
			Posts: responseType,
		}
		json.NewEncoder(w).Encode(result)
	}
}
func SearchUserPost(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	var search model.Search
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&search)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.SearchPost(search, true)
		result := model.GetAllSearchPost{
			Posts: responseType,
		}
		json.NewEncoder(w).Encode(result)
	}
}

func LoginUserTest(w http.ResponseWriter, r *http.Request) {
	var login model.Login
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&login)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.Login(login, false)
		json.NewEncoder(w).Encode(responseType)
	}
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var login model.Login
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&login)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.Login(login, true)
		json.NewEncoder(w).Encode(responseType)
	}
}

func GetUserFeedTest(w http.ResponseWriter, r *http.Request) {
	posts, responseType := controller.GetUserFeed(1, false)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(posts)
		return
	}
	http.Error(w, "Invalid request", http.StatusBadRequest)
}

func GetUserFeed(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	posts, responseType := controller.GetUserFeed(userid, true)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(posts)
		return
	}
	http.Error(w, "Invalid request", http.StatusBadRequest)
}

func GetUserRecommendations(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	posts, responseType := controller.GetUserRecommendations(userid)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(posts)
		return
	}
	http.Error(w, "Invalid request", http.StatusBadRequest)
}
func UserListTest(w http.ResponseWriter, r *http.Request) {
	responseType := controller.UserList(1, false)
	result := model.UserListResponses{
		Users: responseType,
	}
	json.NewEncoder(w).Encode(result)
}

func UserList(w http.ResponseWriter, r *http.Request) {
	fmt.Println("userid")
	userid := Authentification(w, r)
	fmt.Println(userid)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	responseType := controller.UserList(userid, true)
	result := model.UserListResponses{
		Users: responseType,
	}

	json.NewEncoder(w).Encode(result)
}

func CreateNewPost(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	var post model.Post
	user, _ := controller.GetUser(userid)
	if (user != model.User{}) {
		r.ParseMultipartForm(10 << 20)
		file, handler, err := r.FormFile("myFile")
		if err != nil {
			if r.Body != nil {
				post.Title = r.FormValue("Title")
				post.Content = r.FormValue("Content")
				post.IDUser = userid
				post.Image = ""
				if s, err := strconv.ParseUint(r.FormValue("Linked_Post"), 2, 32); err == nil {
					post.Linked_Post = uint(s)
				}
				post.Status = r.FormValue("Status")
				post.Tags = r.FormValue("Tags")
				post.Type = r.FormValue("Type")
				post.Summary = r.FormValue("Summary")

				responseType := controller.CreatePost(post, true)
				json.NewEncoder(w).Encode(http.StatusText(responseType))
			}
		}
		if err == nil {
			dir := "../epitomize-frontend/src/images"
			if _, err := os.Stat("../epitomize-frontend/src/images/" + user.Username); os.IsNotExist(err) {
				os.Mkdir("../epitomize-frontend/src/images/"+user.Username, 0700)
			}
			destination := dir + "/" + user.Username + "/" + handler.Filename
			dst, err := os.Create(destination)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer dst.Close()
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			if _, err := io.Copy(dst, file); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			filedst := user.Username + "/" + handler.Filename
			if r.Body != nil {
				post.Title = r.FormValue("Title")
				post.Content = r.FormValue("Content")
				post.IDUser = userid
				post.Image = filedst
				if s, err := strconv.ParseUint(r.FormValue("Linked_Post"), 2, 32); err == nil {
					post.Linked_Post = uint(s)
				}
				post.Status = r.FormValue("Status")
				post.Tags = r.FormValue("Tags")
				post.Type = r.FormValue("Type")
				post.Summary = r.FormValue("Summary")

				responseType := controller.CreatePost(post, true)
				json.NewEncoder(w).Encode(http.StatusText(responseType))
			}
		}
	}
}

func GetPostTest(w http.ResponseWriter, r *http.Request) {
	post, responseType := controller.GetPost(1, false)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(post)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	post, responseType := controller.GetPost(postId, true)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(post)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}
func GetDraft(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	post, responseType := controller.GetDraft(postId, true)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(post)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}
}

func EditPostTest(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	err, responseType := controller.EditPost(1, post, 1, false)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
	} else {
		json.NewEncoder(w).Encode(http.StatusText(responseType))
	}
}
func ConvertToPost(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	postId, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var post model.Post
	_, responseType := controller.ConvertDraft(postId, post, code, true)
	if responseType == http.StatusOK {
		json.NewEncoder(w).Encode(post)
		return
	} else {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	}

}
func EditPost(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	var post model.Post
	user, _ := controller.GetUser(code)
	if (user != model.User{}) {
		r.ParseMultipartForm(10 << 20)
		file, handler, err := r.FormFile("myFile")
		if err != nil {
			if r.Body != nil {
				post.Title = r.FormValue("Title")
				post.Content = r.FormValue("Content")
				post.IDUser = code
				post.Image = ""
				if s, err := strconv.ParseUint(r.FormValue("Linked_Post"), 2, 32); err == nil {
					post.Linked_Post = uint(s)
				}
				post.Status = r.FormValue("Status")
				post.Tags = r.FormValue("Tags")
				post.Type = r.FormValue("Type")
				post.Summary = r.FormValue("Summary")
				params := mux.Vars(r)
				id := params["id"]
				postId, err := strconv.ParseUint(id, 10, 64)
				if err != nil {
					fmt.Println(err)
					http.Error(w, err.Error(), http.StatusBadRequest)
					return
				}
				err, responseType := controller.EditPost(postId, post, code, true)
				if err != nil {
					http.Error(w, err.Error(), http.StatusServiceUnavailable)
				} else {
					json.NewEncoder(w).Encode(http.StatusText(responseType))
				}
			}
		}
		if err == nil {
			dir := "../epitomize-frontend/src/images"
			if _, err := os.Stat("../epitomize-frontend/src/images/" + user.Username); os.IsNotExist(err) {
				os.Mkdir("../epitomize-frontend/src/images/"+user.Username, 0700)
			}
			destination := dir + "/" + user.Username + "/" + handler.Filename
			dst, err := os.Create(destination)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			defer dst.Close()
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			if _, err := io.Copy(dst, file); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			filedst := user.Username + "/" + handler.Filename
			if r.Body != nil {
				post.Title = r.FormValue("Title")
				post.Content = r.FormValue("Content")
				post.IDUser = code
				post.Image = filedst
				if s, err := strconv.ParseUint(r.FormValue("Linked_Post"), 2, 32); err == nil {
					post.Linked_Post = uint(s)
				}
				post.Status = r.FormValue("Status")
				post.Tags = r.FormValue("Tags")
				post.Type = r.FormValue("Type")
				post.Summary = r.FormValue("Summary")
				params := mux.Vars(r)
				id := params["id"]
				postId, err := strconv.ParseUint(id, 10, 64)
				if err != nil {
					http.Error(w, err.Error(), http.StatusBadRequest)
					return
				}
				err, responseType := controller.EditPost(postId, post, code, true)
				if err != nil {
					http.Error(w, err.Error(), http.StatusServiceUnavailable)
				} else {
					json.NewEncoder(w).Encode(http.StatusText(responseType))
				}
			}
		}
	}
}

func DeletePostTest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]
	controller.DeletePost(id, 1, false)
}
func FollowUserTest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["userid"]
	Val, _ := strconv.ParseUint(id, 10, 64)
	responseType := controller.FollowUser(uint(Val), 1, false)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}
func FollowUser(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	params := mux.Vars(r)
	id := params["userid"]
	Val, _ := strconv.ParseUint(id, 10, 64)
	responseType := controller.FollowUser(uint(Val), userid, true)
	fmt.Println(responseType)
	if responseType == 201 {
		controller.Notify("follow", userid, uint(Val), 0, true)
		json.NewEncoder(w).Encode(http.StatusText(200))
	}
}
func UnFollowUserTest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["userid"]
	Val, _ := strconv.ParseUint(id, 10, 64)
	responseType := controller.UnFollowUser(uint(Val), 1, false)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}
func UnFollowUser(w http.ResponseWriter, r *http.Request) {
	userid := Authentification(w, r)
	if userid == http.StatusUnauthorized || userid == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(userid)), int(userid))
		return
	}
	params := mux.Vars(r)
	id := params["userid"]
	Val, _ := strconv.ParseUint(id, 10, 64)
	responseType := controller.UnFollowUser(uint(Val), userid, true)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}
func DeletePost(w http.ResponseWriter, r *http.Request) {
	code := Authentification(w, r)
	if code == http.StatusUnauthorized || code == http.StatusBadRequest {
		http.Error(w, http.StatusText(int(code)), int(code))
		return
	}
	params := mux.Vars(r)
	id := params["id"]
	controller.DeletePost(id, code, true)
}

func HomePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "HomePage")
}

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Executing middleware", r.Method)

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Authorization")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
		log.Println("Executing middleware again")
	})
}

func HandleRequests() {
	myRouter := mux.NewRouter()
	// myRouter.Use(accessControlMiddleware)
	myRouter.HandleFunc("/", HomePage)
	myRouter.HandleFunc("/post", AllPost).Methods("GET")
	myRouter.HandleFunc("/alltags", AllTags).Methods("GET")
	myRouter.HandleFunc("/topTags", TopTags).Methods("GET")
	myRouter.HandleFunc("/post/{id}", GetPost).Methods("GET")
	myRouter.HandleFunc("/post", CreateNewPost).Methods("POST")
	myRouter.HandleFunc("/post/{id}", EditPost).Methods("PUT")
	myRouter.HandleFunc("/deleteposts/{id}", DeletePost).Methods("DELETE")
	myRouter.HandleFunc("/login", LoginUser).Methods("POST")
	myRouter.HandleFunc("/userlist", UserList).Methods("GET")
	myRouter.HandleFunc("/user", CreateNewUser).Methods("POST")
	myRouter.HandleFunc("/user", GetUser).Methods("GET")
	myRouter.HandleFunc("/follow/{userid}", FollowUser).Methods("GET")
	myRouter.HandleFunc("/unfollow/{userid}", UnFollowUser).Methods("GET")
	myRouter.HandleFunc("/user/feed", GetUserFeed).Methods("GET")
	myRouter.HandleFunc("/user/recommended", GetUserRecommendations).Methods("GET")
	myRouter.HandleFunc("/search", SearchUserPost).Methods("POST")
	myRouter.HandleFunc("/uploadImage", uploadHandler).Methods("POST")
	myRouter.HandleFunc("/uploadImage", uploadHandler).Methods("GET")
	myRouter.HandleFunc("/draft", AllDraft).Methods("GET")
	myRouter.HandleFunc("/draft/{id}", GetDraft).Methods("GET")
	myRouter.HandleFunc("/toPost/{id}", ConvertToPost).Methods("GET")
	myRouter.HandleFunc("/notification", AllNotifications).Methods("GET")
	myRouter.HandleFunc("/readinglist/{id}", AddToReadingList).Methods("POST")
	myRouter.HandleFunc("/readinglist", GetReadingList).Methods("GET")
	myRouter.HandleFunc("/readinglist/{id}", RemoveFromReadingList).Methods("DELETE")
	myRouter.HandleFunc("/user/profile/{id}", GetUserProfile).Methods("GET")
	myRouter.HandleFunc("/react/{id}", AddReactionToPost).Methods("POST")
	myRouter.HandleFunc("/react/{id}", GetReactionsUserList).Methods("GET")
	myRouter.HandleFunc("/react/{id}", RemoveReactionFromPost).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8081", CorsMiddleware(myRouter)))
}

func main() {
	if err := database.InitDB().Error; err != nil {
		fmt.Println(err)
		return
	}
	HandleRequests()
}
