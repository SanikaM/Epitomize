package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/pilinux/gorest/database/model"
	"github.com/stretchr/testify/assert"
)

func Router(fun func(w http.ResponseWriter, r *http.Request), method string, path string) *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc(path, fun).Methods(method)
	return router
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
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateNewPostTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
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
	login.Emailid = "test@test.com"
	login.Password = "pass"
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(login)
	if err != nil {
		log.Fatal(err)
	}
	req, err := http.NewRequest(http.MethodPost, "/login", &buf)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(LoginUserTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
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
