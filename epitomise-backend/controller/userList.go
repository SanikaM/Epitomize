package controller

import (
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func UserList(userid uint) []model.UserList {
	res := []model.UserList{}
	db := database.GetDB()
	user := []model.User{}
	db.Where("user_id  <> ?", userid).Find(&user)
	for _, p := range user {
		var userTemp model.UserList
		userTemp.UserId = p.UserId
		userTemp.Username = p.Username
		userTemp.About = p.About
		res = append(res, userTemp)

	}
	return res
}
