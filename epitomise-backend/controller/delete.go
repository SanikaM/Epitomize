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
		db.Delete(&model.Post{}, IdNum)
		db.Where("post_id = ?", IdNum).Delete(&model.PostTag{})
		var result string = "succcess"
		return result
	}
	return "Successfully Deleted"
}
