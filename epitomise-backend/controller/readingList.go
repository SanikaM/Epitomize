package controller

import (
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func AddToReadingList(userId uint, postId uint) int {
	db := database.GetDB()
	var readingList model.Readinglist

	if err := db.First(&readingList, "user_id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return createReadingList(userId, postId)
		} else {
			return http.StatusBadRequest
		}
	} else {
		return addToExistingReadingList(readingList, postId)
	}
}

func createReadingList(userId uint, postId uint) int {
	db := database.GetDB()
	var readingList model.Readinglist
	readingList.UserId = userId
	readingList.Posts[0] = postId
	if err := db.Create(&readingList).Error; err != nil {
		return http.StatusOK
	} else {
		return http.StatusBadRequest
	}
}

func addToExistingReadingList(readingList model.Readinglist, postId uint) int {
	db := database.GetDB()
	readingList.Posts = append(readingList.Posts, postId)
	//Checking if post is already in list
	for _, id := range readingList.Posts {
		if id == postId {
			return http.StatusOK
		}
	}
	if err := db.Save(&readingList).Error; err != nil {
		return http.StatusOK
	} else {
		return http.StatusBadRequest
	}
}

func GetReadingList(userId uint) ([]model.Post, int) {
	Posts := []model.Post{}
	db := database.GetDB()
	var readingList model.Readinglist

	if err := db.First(&readingList, "user_id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return Posts, http.StatusOK
		} else {
			return Posts, http.StatusBadRequest
		}
	} else {
		for _, postId := range readingList.Posts {
			post, _ := GetPost(uint64(postId), true)
			Posts = append(Posts, post)
		}
		return Posts, http.StatusOK
	}
}
