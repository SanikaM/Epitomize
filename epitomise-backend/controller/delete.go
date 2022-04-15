package controller

import (
	"strconv"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func DeletePost(id string, userid uint, test bool) string {
	if test {
		db := database.GetDB()
		IdNum, _ := strconv.ParseUint(id, 10, 32)
		db.Where("user_id = ? and post_id = ? and status = ?", userid, IdNum, 0).Delete(&model.PostTag{})
		var result string = "succcess"
		return result
	}
	return "Successfully Deleted"
}
func DeleteDraft(id string, userid uint, test bool) string {
	if test {
		db := database.GetDB()
		IdNum, _ := strconv.ParseUint(id, 10, 32)
		db.Where("user_id = ? and post_id = ? and status = ?", userid, IdNum, 1).Delete(&model.PostTag{})
		var result string = "succcess"
		return result
	}
	return "Successfully Deleted"
}
