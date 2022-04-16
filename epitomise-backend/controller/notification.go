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
			db.Create(&notification)

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
