package controller

import (
	"fmt"
	"net/http"
	"sort"
	"strings"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"github.com/pilinux/gorest/service"
	"gorm.io/gorm"
)

func CreateUser(user model.User) model.ErrorResponse {
	db := database.GetDB()
	if service.IsStringFieldEmpty(user.Username) {
		err := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Username cannot be empty",
		}
		return err
	}

	if err := db.Where("username = ?", user.Username).First(&user).Error; err == nil {
		errorResponse := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Username already exists",
		}
		return errorResponse
	}

	if service.IsStringFieldEmpty(user.Emailid) || !service.IsEmailValid(user.Emailid) {
		fmt.Println(user.Emailid)
		err := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Invalid Email ID",
		}
		return err
	}

	if err := db.Where("emailid = ?", user.Emailid).First(&user).Error; err == nil {
		errorResponse := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Email ID already exists",
		}
		return errorResponse
	}

	if service.IsStringFieldEmpty(user.Password) {
		err := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Password cannot be empty",
		}
		return err
	}

	if service.IsStringFieldEmpty(user.About) {
		err := model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "About cannot be empty",
		}
		return err
	}

	user.Password = model.HashPass(user.Password)

	if err := db.Create(&user).Error; err != nil {
		return model.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Message:  "Unable to create new user",
		}
	}

	return model.ErrorResponse{
		HTTPCode: http.StatusOK,
		Message:  "New user successfully created",
	}
}

func GetUser(userId uint) (model.User, int) {
	var userModel model.User
	db := database.GetDB()
	if err := db.First(&userModel, "user_id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return userModel, http.StatusNotFound
		} else {
			return userModel, http.StatusBadRequest
		}
	}
	userModel.Password = ""
	return userModel, http.StatusOK
}

func GetUserFeed(userId uint, test bool) ([]model.Post, int) {
	Posts := []model.Post{}
	if test {
		db := database.GetDB()
		Followers := []model.Follow{}

		if err := db.Where("current_user_id = ?", userId).Find(&Followers).Error; err == gorm.ErrRecordNotFound {
			return Posts, http.StatusOK
		} else if err == nil {
			for _, obj := range Followers {
				Posts = append(Posts, GetPosts(obj.FollowingUserId, true)...)
			}
		}
		Posts = SortPostsByDate(Posts)
		return Posts, http.StatusOK
	}
	return Posts, http.StatusOK
}

func SortPostsByDate(posts []model.Post) []model.Post {
	sort.Slice(posts, func(i, j int) bool {
		return posts[i].PostsUId < posts[j].PostsUId
	})
	return posts
}

func GetUserRecommendations(userId uint) ([]model.Post, int) {
	Posts := []model.Post{}
	user, resp := GetUser(userId)

	if resp != http.StatusOK {
		return Posts, resp
	}
	tags := strings.Split(user.Tags, ",")
	for _, tag := range tags {
		Posts = append(Posts, GetPostsWithTag(tag)...)
	}
	Posts = SortPostsByDate(Posts)
	return Posts, http.StatusOK
}

func GetPostsWithTag(tag string) []model.Post {
	db := database.GetDB()
	Posts := []model.Post{}
	if err := db.Where("tags LIKE ?", "%"+tag+"%").Find(&Posts).Error; err == gorm.ErrRecordNotFound {
		return Posts
	} else if err == nil {
		return Posts
	}
	return Posts
}
func UpdateProfilePicture(userid uint, filePath string) int {
	var userModel model.User
	db := database.GetDB()
	db.Model(userModel).Where(" user_id = ?", userid).Update("profilepicture", filePath)
	return http.StatusAccepted

}
