package controller

import (
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func seedTag(db *gorm.DB) {
	posts := []model.Tag{
		{
			ID:   1,
			Type: "Frontend",
		},
		{
			ID:   2,
			Type: "Backend",
		},
		{
			ID:   3,
			Type: "Database",
		},
	}
	for _, p := range posts {
		db.Create(&p)
	}
}
func GetTags() []model.Tag {
	db := database.GetDB()
	//seedTag(db)
	tags := []model.Tag{}
	db.Find(&tags)
	//fmt.Println(posts)

	return tags

}
