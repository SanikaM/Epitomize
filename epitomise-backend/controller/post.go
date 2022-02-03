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
			// Tags:        []string{"Frontend", "BackEnd", "Database"},
		},
	}
	for _, p := range posts {
		db.Create(&p)
	}
}
func GetPosts() []model.Post {
	db := database.GetDB()
	//seed(db)

	db.Find(&Posts)
	fmt.Println("From controller", Posts)

	return Posts

}
