package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var TopTags []model.TagResponse

func GetTopTags() []string {
	db := database.GetDB()
	// reference query
	// select t.type from tags t JOIN(select tag_id from post_tags group
	//	by tag_id order by count(post_id)  desc) p on t.tag_uid = p.tag_id;
	//tagArrays := []model.TagResponse{}
	posttags := []model.PostTag{}
	tagResponse := model.TagResponse{}
	tag := []model.Tag{}
	fmt.Println("Line 19")

	db.Model(&tag).Select("tags.type").Joins("JOIN (?) p on tags.tag_uid = p.tag_id", db.Model(&posttags).Select("tag_id").Group("tag_id").Order("count(post_id) desc").Find(&posttags)).Find(&tag)

	fmt.Println("From controller", tag[1].Type)
	for i := 0; i < len(tag); i++ { //looping from 0 to the length of the array

		tagResponse.Type = append(tagResponse.Type, tag[i].Type)
	}
	//tags = append(tags, tag)

	fmt.Println(tagResponse)
	return tagResponse.Type
}
