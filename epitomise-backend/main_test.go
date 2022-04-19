package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strconv"
	"testing"

	"github.com/gorilla/mux"
	"github.com/pilinux/gorest/database/model"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var errorState int

type Tag model.Tag
type PostTag model.PostTag
type post model.Post
type user model.User
type follow model.Follow
type notification model.Notification
type readinglist model.Readinglist
type reaction model.Reaction

// InitDB - function to initialize db
func InitDB() *gorm.DB {
	var database = db
	database, err := gorm.Open(sqlite.Open("/Users/akashparikh/Desktop/test.db"), &gorm.Config{})
	if err != nil {
		panic("Error in Database connection")
	}
	if err == nil {
		fmt.Println("DB connection successful!")
	}
	db = database
	return db
}

// GetDB - get a connection
func GetDB() *gorm.DB {
	return db
}
func migrateTables() {

	if err := db.AutoMigrate(&Tag{},
		&post{}, &PostTag{}, &user{}, &follow{}, &notification{}, &readinglist{}, &reaction{}); err != nil {
		errorState = 1
		fmt.Println(err)
	} else {
		fmt.Println("New tables are  migrated successfully!")
	}

}
func TestMain(m *testing.M) {
	InitDB()
	GetDB()
	migrateTables()
	exitVal := m.Run()
	dropAllTables()
	os.Exit(exitVal)
}
func dropAllTables() {
	// Careful! It will drop all the tables!
	if err := db.Migrator().DropTable(&Tag{}, &PostTag{}, &post{}, &user{}, &follow{}, &notification{}, &readinglist{}, &reaction{}); err != nil {
		errorState = 1
	} else {
	}
}
func Router(fun func(w http.ResponseWriter, r *http.Request), method string, path string) *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc(path, fun).Methods(method)
	return router
}
func TestCreateUser(t *testing.T) {
	user := model.User{}
	user.Username = "don"
	user.Password = "password"
	user.About = "about Sagar"
	user.Emailid = "test@abc.edu"
	user.Profilepicture = "pp"
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(user)
	if err != nil {
		log.Fatal(err)
	}
	req, err := http.NewRequest(http.MethodPost, "/user", &buf)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var user model.User
		if r.Body != nil {
			err := json.NewDecoder(r.Body).Decode(&user)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			user.Password = model.HashPass(user.Password)
			if err := db.Create(&user).Error; err != nil {
				return
			}
		}
	})
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

}
func TestHomePage(t *testing.T) {
	request, _ := http.NewRequest("GET", "/", nil)
	response := httptest.NewRecorder()
	Router(HomePage, "GET", "/").ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK")
	assert.Equal(t, "HomePage", response.Body.String(), "Corrext Body")
}
func TestTopTags(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/topTags", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(TopTagsTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestDeletePost(t *testing.T) {
	req, err := http.NewRequest(http.MethodDelete, "/deleteposts/2", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(DeletePostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestAllPost(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/post", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AllPostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestCreatePost(t *testing.T) {
	req, err := http.NewRequest(http.MethodPost, "/post", nil)
	data := url.Values{}
	data.Add("Type", "My Document")
	data.Add("Title", "Matt Aimonetti")
	data.Add("Summary", "A document with all the Go programming language secrets")
	data.Add("Content", "Lgiving users in over 150 supported countries the ability to trade with up to 5x leverage")
	data.Add("Linked_Post", "0")
	data.Add("Status", "0")
	data.Add("Tags", "Crypto,Bitcoin")
	data.Add("myFile", "test.txt")
	req.PostForm = data
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var post model.Post
		req.ParseMultipartForm(10 << 20)
		post.Title = r.FormValue("Title")
		post.Content = r.FormValue("Content")
		post.IDUser = 1
		if s, err := strconv.ParseUint(r.FormValue("Linked_Post"), 2, 32); err == nil {
			post.Linked_Post = uint(s)
		}
		post.Status = r.FormValue("Status")
		post.Tags = r.FormValue("Tags")
		post.Type = r.FormValue("Type")
		post.Summary = r.FormValue("Summary")
		db.Create(&post)
		sd := model.StandardResponse{
			Message: "Post Successfully Created",
		}
		respondWithJSON(w, http.StatusOK, sd)
	})
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"Message":"Post Successfully Created"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestGetPost(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/post/1", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetPostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
func TestEditPost(t *testing.T) {
	req, err := http.NewRequest(http.MethodPut, "/post/1", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(EditPostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
func TestLoginPost(t *testing.T) {
	login := model.Login{}
	login.Emailid = "test@abc.edu"
	login.Password = "password"
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(login)
	if err != nil {
		return
	}
	req, err := http.NewRequest(http.MethodPost, "/login", &buf)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var login model.Login
		if r.Body != nil {
			err := json.NewDecoder(r.Body).Decode(&login)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			res := model.LoginResponse{}
			db := GetDB()
			user := []model.User{}
			password := login.Password
			db.Where("Emailid   = ?", login.Emailid).Find(&user)
			if len(user) == 0 {
				res.Result = "Unauthorized user"
				return
			}
			if !model.CheckPassword(password, user[0].Password) {
				res.Result = "Unauthorized user"
				return
			}
			res.Email = user[0].Emailid
			res.UserName = user[0].Username
			res.Result = "Successfully logged in."
			respondWithJSON(w, http.StatusOK, res)
		}
	})
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := `{"Access_Token":"","Email":"test@abc.edu","Result":"Successfully logged in.","UserName":"don"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestFollowPost(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/follow/2", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(FollowUserTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
func TestUnFollowPost(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/unfollow/2", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UnFollowUserTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestUserList(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/user", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(UserListTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestUserFeed(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/user/feed", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetUserFeedTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestSearchPost(t *testing.T) {
	search := model.Search{}
	search.Text = "test"
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(search)
	if err != nil {
		log.Fatal(err)
	}
	req, err := http.NewRequest(http.MethodPost, "/search", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(SearchUserPostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	//encode payload to json
	response, _ := json.Marshal(payload)

	// set headers and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
