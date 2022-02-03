package controller

import (
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
			TagId:  1,
		},
	}
	for _, p := range posttags {
		db.Create(&p)
	}
}
func GetPostTags() []model.PostTag {
	db := database.GetDB()
	//seedPostTag(db)
	posttags := []model.PostTag{}
	db.Find(&posttags)
	//fmt.Println(posts)

	return posttags

}
