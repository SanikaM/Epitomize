package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var Notications []model.Notification

func Notify(mtype string, currentuserid uint, notifyuserid uint, read uint, test bool) string {
	if test {
		if mtype == "follow" {
			fmt.Println("hello")
			user := model.User{}
			db := database.GetDB()
			db.Where("user_id   = ?", currentuserid).Find(&user)
			notification := model.Notification{}
			notification.Userid = notifyuserid
			notification.Message = "User " + user.Username + " followed you"
			notification.Path = "/userprofile/" + strconv.FormatUint(uint64(currentuserid), 10)
			ValidateInsertion(notification)
		}
		var result string = "succcess"
		return result
	}
	return "Successfully Deleted"
}
func GetNotifications(userid uint) []model.Notification {
	db := database.GetDB()
	db.Where("userid = ?", userid).Find(&Notications)

	return Notications
}

func ReadNotification(notify uint, userid uint) int {
	db := database.GetDB()
	db.Model(&model.Notification{}).Where("userid = ? and n_id   = ?", userid, notify).Update("read", 1)
	return http.StatusOK
}

func ReadAllNotification(userid uint) int {
	db := database.GetDB()
	db.Model(&model.Notification{}).Where("userid = ?", userid).Update("read", 1)
	return http.StatusOK
}
func DeleteNotification(notify uint, userid uint) int {
	db := database.GetDB()
	db.Where("userid = ? and n_id = ?", userid, notify).Delete(&model.Notification{})
	return http.StatusOK
}
func NotifyonNewPost(userid uint, postid uint) int {
	db := database.GetDB()
	var Follower []model.Follow
	db.Where("following_user_id = ?", userid).Find(&Follower)
	curruser := model.User{}
	db.Where("user_id   = ?", userid).Find(&curruser)
	for _, f := range Follower {
		user := model.User{}
		db.Where("user_id   = ?", f.CurrentUserId).Find(&user)
		notification := model.Notification{}
		notification.Userid = user.UserId
		notification.Message = "User " + curruser.Username + " posted a new post"
		notification.Path = "/post/" + strconv.FormatUint(uint64(postid), 10)
		notification.Read = 0
		ValidateInsertion(notification)
	}
	return http.StatusOK
}

func NotifyonPostLike(userid uint, postid uint) int {
	db := database.GetDB()
	currpost := model.Post{}
	db.Where("posts_uid  = ?", postid).Find(&currpost)
	curruser := model.User{}
	db.Where("user_id   = ?", userid).Find(&curruser)
	notification := model.Notification{}
	notification.Userid = currpost.IDUser
	notification.Message = "User " + curruser.Username + " like your post " + currpost.Title
	notification.Path = "/post/" + strconv.FormatUint(uint64(postid), 10)
	notification.Read = 0
	result := ValidateInsertion(notification)
	return result
}
func ValidateInsertion(notification model.Notification) int {
	val := model.Notification{}
	db := database.GetDB()
	db.Where("message =  ? and userid = ?", notification.Message, notification.Userid).Find(&val)
	if (val == model.Notification{}) {
		fmt.Println(val)
		db.Create(&notification)
		return http.StatusOK
	}
	return http.StatusFound

}
