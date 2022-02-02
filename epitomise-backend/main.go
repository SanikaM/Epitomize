package main

import (
	"fmt"

	"github.com/pilinux/gorest/controller"
	"github.com/pilinux/gorest/database"
)

func main() {
	if err := database.InitDB().Error; err != nil {
		fmt.Println(err)
		return
	}
	posts := controller.GetPosts()
	tags := controller.GetTags()
	postags := controller.GetPostTags()
	for _, p := range posts {
		fmt.Println("ID", p.ID,
			"Type", p.Type,
			"Title", p.Title,
			"Summary", p.Summary,
			"Status", p.Status,
			"Content", p.Content,
			"Linked_post", p.Linked_Post,
		)
	}
	for _, t := range tags {
		fmt.Println("ID", t.ID,
			"Tag Type", t.Type,
		)
	}
	for _, pt := range postags {
		fmt.Println("ID", pt.ID,
			"PostId", pt.PostId,
			"TagId", pt.TagId,
		)
	}
}
