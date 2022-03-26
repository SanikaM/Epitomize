package main

import (
	"encoding/json"
	"fmt"
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

func AllPostTest(w http.ResponseWriter, r *http.Request) {
	posts := controller.GetPosts(false)
	result := model.GetAllPost{
		Posts: posts,
	}
	json.NewEncoder(w).Encode(result)
}
func AllPost(w http.ResponseWriter, r *http.Request) {
	posts := controller.GetPosts(true)
	result := model.GetAllPost{
		Posts: posts,
	}
	json.NewEncoder(w).Encode(result)
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
func TopTags(w http.ResponseWriter, r *http.Request) {
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
func LoginUser(w http.ResponseWriter, r *http.Request) {
	var login model.Login
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&login)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.Login(login)
		json.NewEncoder(w).Encode(responseType)
	}
}
func UserList(w http.ResponseWriter, r *http.Request) {
	reqToken := r.Header.Get("Authorization")
	if len(reqToken) == 0 {
		w.WriteHeader(http.StatusUnauthorized)
		return
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
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Println((claims.Username))
	responseType := controller.UserList()
	result := model.UserListResponses{
		Users: responseType,
	}

	json.NewEncoder(w).Encode(result)
}
func CreateNewPost(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&post)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		responseType := controller.CreatePost(post, true)
		json.NewEncoder(w).Encode(http.StatusText(responseType))
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
func EditPostTest(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	err, responseType := controller.EditPost(1, post, false)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
	} else {
		json.NewEncoder(w).Encode(http.StatusText(responseType))
	}
}
func EditPost(w http.ResponseWriter, r *http.Request) {
	var post model.Post
	if r.Body != nil {
		err := json.NewDecoder(r.Body).Decode(&post)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		params := mux.Vars(r)
		id := params["id"]
		postId, err := strconv.ParseUint(id, 10, 64)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		err, responseType := controller.EditPost(postId, post, true)
		// result := http.Response{
		// 	StatusCode: responseType,
		// 	Body:       ioutil.NopCloser(bytes.NewBufferString(err.Error())),
		// }
		// if err != nil {
		// 	json.NewEncoder(w).Encode(err.Error())
		// } else {
		// 	json.NewEncoder(w).Encode(result)
		// }
		if err != nil {
			http.Error(w, err.Error(), http.StatusServiceUnavailable)
		} else {
			json.NewEncoder(w).Encode(http.StatusText(responseType))
		}
	}
}

func DeletePostTest(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id := params["id"]
	controller.DeletePost(id, false)
}
func DeletePost(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id := params["id"]
	controller.DeletePost(id, true)
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
	myRouter.HandleFunc("/topTags", TopTags).Methods("GET")
	myRouter.HandleFunc("/post/{id}", GetPost).Methods("GET")
	myRouter.HandleFunc("/post", CreateNewPost).Methods("POST")
	myRouter.HandleFunc("/post/{id}", EditPost).Methods("PUT")
	myRouter.HandleFunc("/deleteposts/{id}", DeletePost).Methods("DELETE")
	myRouter.HandleFunc("/login", LoginUser).Methods("POST")
	myRouter.HandleFunc("/userlist", UserList).Methods("GET")
	log.Fatal(http.ListenAndServe(":8081", CorsMiddleware(myRouter)))
}

func main() {
	if err := database.InitDB().Error; err != nil {
		fmt.Println(err)
		return
	}

	HandleRequests()
}
