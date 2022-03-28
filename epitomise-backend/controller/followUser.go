package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func FollowUser(followingid uint, currentid uint) int {
	follower := model.Follow{
		FollowingUserId: followingid,
		CurrentUserId:   currentid,
	}
	db := database.GetDB()
	result := db.Select("FollowingUserId", "CurrentUserId").Create(&follower)
	fmt.Println(result.Rows())
	return http.StatusCreated
}
