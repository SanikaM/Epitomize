package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func GetAllTags(testflag bool) ([]string, int) {
	if testflag {
		db := database.GetDB()
		// reference query
		// select t.type from tags t JOIN(select tag_id from post_tags group
		//	by tag_id order by count(post_id)  desc) p on t.tag_uid = p.tag_id;
		//tagArrays := []model.TagResponse{}
		tagResponse := model.TagResponse{}
		tag := []model.Tag{}
		if err := db.Find(&tag).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return tagResponse.Type, http.StatusNotFound
			} else {
				return tagResponse.Type, http.StatusBadRequest
			}
		}
		for i := 0; i < len(tag); i++ { //looping from 0 to the length of the array

			tagResponse.Type = append(tagResponse.Type, tag[i].Type)
		}

		//tags = append(tags, tag)

		fmt.Println(tagResponse)
		return tagResponse.Type, http.StatusOK
	}

	return []string{"backend", "s3x"}, http.StatusOK
}
