package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func seedTag(db *gorm.DB) {
	tags := []model.Tag{
		{

			Type: "frontend",
		},
		{

			Type: "backend",
		},
		{

			Type: "database",
		},
		{

			Type: "united states",
		},
		{

			Type: "finance",
		},
		{

			Type: "blockchain",
		},
		{

			Type: "crypto",
		},
		{

			Type: "amazon web service",
		},
		{

			Type: "s3",
		},
		{

			Type: "ec2",
		},
		{

			Type: "golang",
		},
		{

			Type: "distributed systems",
		},
	}
	for _, t := range tags {
		t.Type = strings.ToLower(t.Type)
		db.Create(&t)
	}
}

func GetTags(id uint) []string {
	var result []string
	db := database.GetDB()
	// seedTag(db)
	tags := []model.Tag{}
	fmt.Println("Inside Tagsssss")
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

func createTag(tags []string) int {
	db := database.GetDB()
	for _, tag := range tags {
		tagType := strings.ToLower(tag)
		var tagModel model.Tag
		// tagModel.Type = tagType
		if err := db.First(&tagModel, "type = ?", tagType).Error; err == gorm.ErrRecordNotFound {
			tagModel.Type = tagType
			if err := db.Create(&tagModel).Error; err != nil {
				return http.StatusConflict
			}
		}
	}
	return http.StatusCreated
}
