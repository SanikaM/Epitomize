package controller

import (
	"strconv"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func DeletePost(id string) string {
	db := database.GetDB()
	// seedTag(db)
	IdNum, _ := strconv.ParseUint(id, 10, 32)
	db.Delete(&model.Post{}, IdNum)
	db.Where("post_id = ?", IdNum).Delete(&model.PostTag{})
	//fmt.Println(posts)
	var result string = "succcess"

	return result

}
