package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

var TopTags []model.TagResponse

func GetTopTags() []model.PostTag {
	db := database.GetDB()
	// reference query
	// select t.type from tags t JOIN(select tag_id from post_tags group
	//	by tag_id order by count(post_id)  desc) p on t.tag_uid = p.tag_id;
	//tagArrays := []model.TagResponse{}
	posttags := []model.PostTag{}
	tag := []model.Tag{}
	fmt.Println("Line 19")

	db.Model(&tag).Select("tags.type").Joins("JOIN (?) p on tags.tag_uid = p.tag_id", db.Model(&posttags).Select("tag_id").Group("tag_id").Order("count(post_id) desc").Find(&posttags)).Find(&tag)
	fmt.Println("From controller", posttags)
	fmt.Println("From controller", tag)

	// fmt.Println(tagArrays[0].Type
	return posttags
}
