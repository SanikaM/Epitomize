package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func seedPostTag(db *gorm.DB) {
	posttags := []model.PostTag{
		{

			PostId: 1,
			TagId:  1,
		},
		{

			PostId: 1,
			TagId:  2,
		},
		{

			PostId: 1,
			TagId:  3,
		},
		{

			PostId: 2,
			TagId:  1,
		},
		{

			PostId: 2,
			TagId:  4,
		},
		{

			PostId: 2,
			TagId:  5,
		},
		{

			PostId: 3,
			TagId:  6,
		},
		{

			PostId: 3,
			TagId:  7,
		},
		{

			PostId: 4,
			TagId:  8,
		},
		{

			PostId: 4,
			TagId:  9,
		},
		{

			PostId: 5,
			TagId:  2,
		},
		{

			PostId: 5,
			TagId:  11,
		},
		{

			PostId: 5,
			TagId:  12,
		},
		{

			PostId: 6,
			TagId:  2,
		},
		{

			PostId: 6,
			TagId:  8,
		},
		{

			PostId: 6,
			TagId:  9,
		},
		{

			PostId: 6,
			TagId:  10,
		},
	}
	for _, p := range posttags {
		db.Create(&p)
	}
}

func GetPostTags(pid uint) []string {
	var res []string
	db := database.GetDB()
	// seedPostTag(db)
	// GetTags(1)
	posttags := []model.PostTag{}

	db.Where("post_id = ?", pid).Find(&posttags)
	fmt.Println(posttags)

	for _, pt := range posttags {
		var result []string = GetTags(pt.TagId)
		res = append(res, result...)
	}
	// fmt.Println("Tag array", res)
	return res

}

func createPostTag(postId uint, tags []string) int {
	db := database.GetDB()
	for _, tag := range tags {
		var tagModel model.Tag
		tagType := strings.ToLower(tag)
		fmt.Println(tag)
		fmt.Println(tagType)
		if err := db.First(&tagModel, "type = ?", tagType).Error; err == nil {
			tagId := tagModel.TagUId
			var postTagModel model.PostTag
			postTagModel.TagId = tagId
			postTagModel.PostId = postId
			db.Create(&postTagModel)
		} else {
			fmt.Println(err)
			return http.StatusBadRequest
		}
	}
	return http.StatusCreated
}
