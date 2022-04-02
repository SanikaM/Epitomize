package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func UnFollowUser(followingid uint, currentid uint, test bool) int {
	if test {
		fmt.Println("Current user", currentid)
		fmt.Println("Following user", followingid)
		user := []model.User{}
		follower := model.Follow{
			FollowingUserId: followingid,
			CurrentUserId:   currentid,
		}
		db := database.GetDB()
		db.Where("user_id = ?", followingid).Find(&user)
		if len(user) > 0 {

			db.Where("following_user_id = ? AND current_user_id = ?", followingid, currentid).Delete(follower)

			return http.StatusCreated
		}
		return http.StatusUnauthorized
	}
	return http.StatusAccepted
}
