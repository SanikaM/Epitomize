package controller

import (
	"fmt"
	"strconv"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var Notications []model.Notification

func Notify(mtype string, currentuserid uint, notifyuserid uint, read uint, test bool) string {
	if test {
		if mtype == "follow" {
			fmt.Println("hello")
			db := database.GetDB()
			notification := model.Notification{}
			notification.Userid = notifyuserid
			notification.Message = "Followed by " + strconv.FormatUint(uint64(currentuserid), 10)
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
