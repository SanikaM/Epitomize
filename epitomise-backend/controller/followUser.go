package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func FollowUser(followingid uint, currentid uint, test bool) int {
	if test {
		fmt.Println("Current user", currentid)
		fmt.Println("Following user", followingid)
		user := []model.User{}
		follower := model.Follow{
			FollowingUserId: followingid,
			CurrentUserId:   currentid,
		}
		followCheck := []model.Follow{}
		db := database.GetDB()
		db.Where("user_id = ?", followingid).Find(&user)
		if len(user) > 0 {
			db.Where("following_user_id = ? AND current_user_id = ?", followingid, currentid).Find(&followCheck)
			if len(followCheck) == 0 {
				result := db.Select("FollowingUserId", "CurrentUserId").Create(&follower)
				fmt.Println(result.Rows())
			}

			return http.StatusCreated
		}
		return http.StatusUnauthorized
	}
	return http.StatusAccepted
}
