package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

var Posts []model.Post

func seed(db *gorm.DB) {
	posts := []model.Post{
		{
			Type:        "Tech",
			Title:       "Go",
			Summary:     "GoLang",
			Content:     "Kuch bhi",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			Type:        "Finance",
			Title:       "There Is a Much Larger Problem Than the Great Resignation. No One Wants to Talk About It",
			Summary:     "Wage growth and people quitting bad jobs  ",
			Content:     "United States likes to talk about problems. Well, ones we have solutions for, anyway. Others we tend to willfully ignore. This latter strategy is typically accomplished by either",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			Type:        "Blockchain",
			Title:       "Trade on Margin with 0% Interest",
			Summary:     "Get up to 5x leverage with 0% interest  ",
			Content:     "Last year we launched Margin Trading on the Blockchain.com Exchange, giving users in over 150 supported countries the ability to trade with up to 5x leverage.",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			Type:        "AWS",
			Title:       "Amazon S3 Event Notifications",
			Summary:     "Subscribing and responding to changes within S3 buckets  ",
			Content:     "Recently celebrating its fifteenth birthday, Amazon Simple Storage Service (S3) was the first service to launch within the vast collection of AWS amenities available to us today. Offering everyone object storage in the cloud, S3 supports a wealth of APIs for object storage, retrieval, and versioning.",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			Type:        "Golang",
			Title:       "Custom-marshal Golang structs with flattening",
			Summary:     "How to marshal a struct field that doesn’t implement the Marshaler interface",
			Content:     "Recently, I needed to marshal a Go struct to JSON and BSON (binary JSON, a serialization format developed by MongoDB), but one of the fields in my struct was an interface that needed special handling.",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			Type:        "AWS",
			Title:       "Configuring AWS ALB with CloudFront — You are Probably Doing It Wrong",
			Summary:     "Not passing an auth token header from CloudFront to AWS Application Load Balancer can be a huge mistake",
			Content:     "Recently, I needed to marshal a Go struct to JSON and BSON (binary JSON, a serialization format developed by MongoDB), but one of the fields in my struct was an interface that needed special handling.",
			Linked_Post: 0,
			Status:      "Draft",
		},
	}
	for _, p := range posts {
		db.Create(&p)
	}
}

func GetPosts(userid uint, test bool) []model.Post {
	if test {
		db := database.GetDB()
		// seed(db)
		// GetPostTags(1)
		tagArrays := []model.TagResponse{}
		fmt.Println("From controller", Posts)
		db.Where("id_user = ?", userid).Find(&Posts)

		fmt.Println("From controller", Posts)

		for i, p := range Posts {
			var tagTemp model.TagResponse
			tagTemp.Type = GetPostTags(p.PostsUId)
			tagArrays = append(tagArrays, tagTemp)
			Posts[i].TagList = tagArrays[i].Type

		}
	}
	return Posts
}

func CreatePost(post model.Post, userid uint, test bool) int {
	if test {
		db := database.GetDB()
		fmt.Println(userid)
		post.IDUser = userid
		if err := db.Create(&post).Error; err != nil {
			return http.StatusBadRequest
		}
		tags := strings.Split(post.Tags, ",")

		if createTag(tags) == http.StatusCreated {
			fmt.Println("tags created - creating posttags!")
			createPostTag(post.PostsUId, tags)
			return http.StatusCreated
		}
		return http.StatusCreated
	}
	return http.StatusCreated
}

func GetPost(id uint64, test bool) (model.Post, int) {
	var postModel model.Post
	if test {
		db := database.GetDB()
		if err := db.First(&postModel, "posts_uid = ?", id).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return postModel, http.StatusNotFound
			} else {
				return postModel, http.StatusBadRequest
			}
		}
		return postModel, http.StatusOK
	}
	return postModel, http.StatusOK

}

func EditPost(id uint64, post model.Post, userid uint, test bool) (error, int) {
	if test {
		db := database.GetDB()
		var postModel model.Post
		if err := db.First(&postModel, "posts_uid = ?", id).Error; err == nil {
			post.IDUser = userid
			post.PostsUId = uint(id)
			if err := db.Save(&post).Error; err != nil {
				return err, http.StatusBadRequest
			}
			return nil, http.StatusOK
		}
		return nil, http.StatusNotFound
	}
	return nil, http.StatusOK
}
