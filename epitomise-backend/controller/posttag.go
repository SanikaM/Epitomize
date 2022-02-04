package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func seedPostTag(db *gorm.DB) {
	posttags := []model.PostTag{
		{
			ID:     1,
			PostId: 1,
			TagId:  1,
		},
		{
			ID:     2,
			PostId: 1,
			TagId:  2,
		},
		{
			ID:     3,
			PostId: 1,
			TagId:  3,
		},
		{
			ID:     4,
			PostId: 2,
			TagId:  1,
		},
		{
			ID:     5,
			PostId: 2,
			TagId:  4,
		},
		{
			ID:     6,
			PostId: 2,
			TagId:  5,
		},
	}
	for _, p := range posttags {
		db.Create(&p)
	}
}
func GetPostTags(pid uint) []string {
	db := database.GetDB()
	//seedPostTag(db)
	posttags := []model.PostTag{}

	db.Where("post_id = ?", pid).Find(&posttags)
	fmt.Println(posttags)
	var res []string
	for _, pt := range posttags {
		var result []string = GetTags(pt.TagId)
		res = append(res, result...)
	}
	fmt.Println("Tag array", res)
	return res

}
