package controller

import (
	"fmt"
	"net/http"

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

func GetUser(userId uint64) (model.User, int) {
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
