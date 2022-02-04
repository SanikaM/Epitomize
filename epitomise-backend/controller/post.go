package controller

import (
	"fmt"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

var Posts []model.Post

func seed(db *gorm.DB) {
	posts := []model.Post{
		{
			ID:          1,
			Type:        "Tech",
			Title:       "Go",
			Summary:     "GoLang",
			Content:     "Kuch bhi",
			Linked_Post: 0,
			Status:      "Draft",
		},
		{
			ID:          2,
			Type:        "Finance",
			Title:       "There Is a Much Larger Problem Than the Great Resignation. No One Wants to Talk About It",
			Summary:     "Wage growth and people quitting bad jobs  ",
			Content:     "United States likes to talk about problems. Well, ones we have solutions for, anyway. Others we tend to willfully ignore. This latter strategy is typically accomplished by either",
			Linked_Post: 0,
			Status:      "Draft",
		},
	}
	for _, p := range posts {
		db.Create(&p)
	}
}
func GetPosts() []model.Post {
	db := database.GetDB()
	//seed(db)
	tagArrays := []model.TagResponse{}
	db.Find(&Posts)
	fmt.Println("From controller", Posts)

	for i, p := range Posts {
		var tagTemp model.TagResponse
		tagTemp.Type = GetPostTags(p.ID)
		tagArrays = append(tagArrays, tagTemp)
		Posts[i].TagList = tagArrays[i].Type

	}
	fmt.Println(tagArrays[0].Type)

	return Posts

}
