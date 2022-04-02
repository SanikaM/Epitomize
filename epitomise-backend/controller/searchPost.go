package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

func SearchPost(search model.Search, test bool) []model.SearchResponse {
	var SearchResposnse []model.SearchResponse
	if test {
		var Posts []model.Post

		db := database.GetDB()
		fmt.Println(search.Text)
		tagArrays := []model.TagResponse{}
		db.Where("title LIKE ? OR type LIKE ? OR summary LIKE ?", "%"+search.Text+"%", "%"+search.Text+"%", "%"+search.Text+"%").Find(&Posts)
		for i, p := range Posts {
			var post model.SearchResponse
			post.PostsUId = p.PostsUId
			post.Summary = p.Summary
			post.Type = p.Type
			post.Title = p.Title
			var tagTemp model.TagResponse
			tagTemp.Type = GetPostTags(p.PostsUId)
			tagArrays = append(tagArrays, tagTemp)
			post.TagList = tagArrays[i].Type
			SearchResposnse = append(SearchResposnse, post)

		}
		fmt.Println(Posts)
		return SearchResposnse
	}
	return SearchResposnse
}
