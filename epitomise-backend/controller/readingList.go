package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func AddToReadingList(userId uint, postId int64) int {
	db := database.GetDB()
	var readingList model.Readinglist

	if err := db.First(&readingList, "user_id = ?", userId).Error; err != nil {
		fmt.Println(err)
		if err == gorm.ErrRecordNotFound {
			fmt.Println("xx")
			return createReadingList(userId, postId)
		} else {
			fmt.Println("yy")
			return http.StatusBadRequest
		}
	} else {
		fmt.Println("zz")
		return addToExistingReadingList(readingList, postId)
	}
}

func createReadingList(userId uint, postId int64) int {
	db := database.GetDB()
	var readingList model.Readinglist
	readingList.UserId = userId
	readingList.Posts = append(readingList.Posts, postId)
	fmt.Println(readingList)
	if err := db.Create(&readingList).Error; err != nil {
		return http.StatusBadRequest
	} else {
		return http.StatusOK
	}
}

func addToExistingReadingList(readingList model.Readinglist, postId int64) int {
	db := database.GetDB()
	//Checking if post is already in list
	for _, id := range readingList.Posts {
		if id == postId {
			return http.StatusOK
		}
	}
	readingList.Posts = append(readingList.Posts, postId)
	if err := db.Save(&readingList).Error; err != nil {
		return http.StatusBadRequest
	} else {
		return http.StatusOK
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
			post, _ := GetPost(userId, uint64(postId), true)
			Posts = append(Posts, post)
		}
		return Posts, http.StatusOK
	}
}

func RemoveFromReadingList(userId uint, postId int64) int {
	db := database.GetDB()
	var readingList model.Readinglist

	if err := db.First(&readingList, "user_id = ?", userId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return http.StatusOK
		} else {
			return http.StatusBadRequest
		}
	} else {
		for index, post := range readingList.Posts {
			if postId == post {
				readingList.Posts = append(readingList.Posts[:index], readingList.Posts[index+1:]...)
			}
		}
		if err := db.Save(&readingList).Error; err != nil {
			return http.StatusBadRequest
		} else {
			return http.StatusOK
		}
	}
}
