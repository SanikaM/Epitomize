package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func seedTag(db *gorm.DB) {
	tags := []model.Tag{
		{

			Type: "Frontend",
		},
		{

			Type: "Backend",
		},
		{

			Type: "Database",
		},
		{

			Type: "United States",
		},
		{

			Type: "Finance",
		},
		{

			Type: "BlockChain",
		},
		{

			Type: "Crypto",
		},
		{

			Type: "Amazon Web Service",
		},
		{

			Type: "S3",
		},
		{

			Type: "EC2",
		},
		{

			Type: "Golang",
		},
		{

			Type: "Distributed Systems",
		},
	}
	for _, t := range tags {
		db.Create(&t)
	}
}
func GetTags(id uint) []string {
	var result []string
	db := database.GetDB()
	// seedTag(db)
	tags := []model.Tag{}
	db.Where("tag_uid  = ?", id).Find(&tags)
	fmt.Println("Inside Tagsssss", tags)

	for _, t := range tags {
		fmt.Println("ID", t.TagUId,
			"Tag Type", t.Type,
		)
		result = append(result, t.Type)
	}
	return result
}
