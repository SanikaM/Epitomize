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
	db.Where("following_user_id = ? AND current_user_id = ?", followingid, currentid).Find(&follower)
	if follower == (model.Follow{}) {
		result := db.Select("FollowingUserId", "CurrentUserId").Create(&follower)
		fmt.Println(result.Rows())
	}

	return http.StatusCreated
}
