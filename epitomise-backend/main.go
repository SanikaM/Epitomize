package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/pilinux/gorest/controller"
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var posts model.Post

func allPost(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Enfpoint Hit:All Articles", posts)
	posts := controller.GetPosts()

	result := model.GetAllPost{
		Posts: posts,
	}
	//fmt.Println(result)
	//fmt.Println(tags)
	json.NewEncoder(w).Encode(result)
}
func receivePost(w http.ResponseWriter, r *http.Request) {
	fmt.Println(w, "Check W")
	fmt.Println(r.Body, "Check r")
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	bodyString := string(bodyBytes)
	fmt.Println("Values", bodyString)
}
func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "HomePage")
}
func accessControlMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            w.Header().Set("Access-Control-Allow-Origin", "*")
            w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT")
            w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

                if r.Method == "OPTIONS" {
                    return
                }

                next.ServeHTTP(w, r)
            })
        }
func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.Use(accessControlMiddleware)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/sendposts", allPost).Methods("GET")
	myRouter.HandleFunc("/getposts", receivePost).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func main() {
	if err := database.InitDB().Error; err != nil {
		fmt.Println(err)
		return
	}

	handleRequests()
}
