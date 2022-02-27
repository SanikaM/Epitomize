package main

import (
	"encoding/json"
	"fmt"

	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/pilinux/gorest/controller"
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var posts model.Post
var postTag model.PostTag

func allPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit:All Articles", posts)
	posts := controller.GetPosts()
	result := model.GetAllPost{
		Posts: posts,
	}
	//fmt.Println(result)
	//fmt.Println(tags)
	json.NewEncoder(w).Encode(result)
}

func topTags(w http.ResponseWriter, r *http.Request) {

	postTag := controller.GetTopTags()
	fmt.Println(postTag)
	//fmt.Println(result)
	//fmt.Println(tags)
	json.NewEncoder(w).Encode(postTag)

}

func createNewPost(w http.ResponseWriter, r *http.Request) {
	// fmt.Println(w, "Check W")
	// fmt.Println(r.Body, "Check r")
	var post model.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseType := controller.CreatePost(post)
	json.NewEncoder(w).Encode(http.StatusText(responseType))
}

func editPost(w http.ResponseWriter, r *http.Request) {
	var post model.Post
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
	err, responseType := controller.EditPost(postId, post)
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

func deletePost(w http.ResponseWriter, r *http.Request) {

	// fmt.Println(r.Body, "Check r")
	// bodyBytes, err := io.ReadAll(r.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// fmt.Println("Values", bodyString)
	params := mux.Vars(r)
	id := params["id"]
	controller.DeletePost(id)
	fmt.Println("User id", id)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "HomePage")
}

func corsMiddleware(next http.Handler) http.Handler {
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

func handleRequests() {
	myRouter := mux.NewRouter()
	// myRouter.Use(accessControlMiddleware)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/post", allPost).Methods("GET")
	myRouter.HandleFunc("/topTags", topTags).Methods("GET")
	myRouter.HandleFunc("/post", createNewPost).Methods("POST")
	myRouter.HandleFunc("/post/{id}", editPost).Methods("PUT")
	myRouter.HandleFunc("/deleteposts/{id}", deletePost).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":8081", corsMiddleware(myRouter)))
}

func main() {
	if err := database.InitDB().Error; err != nil {
		fmt.Println(err)
		return
	}

	handleRequests()
}
