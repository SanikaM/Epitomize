package controller

import (
	"fmt"

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
		{
			ID:   4,
			Type: "United States",
		},
		{
			ID:   5,
			Type: "Finance",
		},
	}
	for _, p := range posts {
		db.Create(&p)
	}
}
func GetTags(id uint) []string {
	db := database.GetDB()
	//seedTag(db)
	tags := []model.Tag{}
	db.Where("id = ?", id).Find(&tags)
	//fmt.Println(posts)
	var result []string
	for _, t := range tags {
		fmt.Println("ID", t.ID,
			"Tag Type", t.Type,
		)
		result = append(result, t.Type)
	}
	return result

}
