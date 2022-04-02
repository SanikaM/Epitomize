package controller

import (
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func UserList(userid uint, test bool) []model.UserList {
	res := []model.UserList{}
	if test {
		db := database.GetDB()
		user := []model.User{}
		follower := []model.Follow{}
		db.Where("current_user_id = ?", userid).Find(&follower)
		var count = 0
		db.Where("user_id  <> ?", userid).Find(&user)
		for _, p := range user {

			var userTemp model.UserList
			userTemp.UserId = p.UserId
			userTemp.Username = p.Username
			userTemp.About = p.About
			userTemp.Follow = 0
			if count < len(follower) {
				if follower[count].FollowingUserId == p.UserId {
					userTemp.Follow = 1
					count += 1
				}
			}
			res = append(res, userTemp)

		}

		return res
	}
	return res
}
