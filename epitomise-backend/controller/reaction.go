package controller

import (
	"fmt"
	"net/http"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
	"gorm.io/gorm"
)

func AddReaction(userId uint, postId uint) int {
	db := database.GetDB()
	var reaction model.Reaction

	if err := db.First(&reaction, "user_id = ? and post_id = ?", userId, postId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return addNewReaction(userId, postId)
		} else {
			return http.StatusBadRequest
		}
	} else {
		return http.StatusOK
	}
}

func addNewReaction(userId uint, postId uint) int {
	db := database.GetDB()
	var reaction model.Reaction
	reaction.UserId = userId
	reaction.PostId = postId
	if err := db.Create(&reaction).Error; err == nil {
		//Increment reaction count in posts table
		updatePostReactionCount(userId, postId, 1)
		return http.StatusOK
	} else {
		return http.StatusBadRequest
	}
}

func updatePostReactionCount(userId uint, postId uint, count int) {
	post, _ := GetPost(userId, uint64(postId), true)
	db := database.GetDB()
	post.ReactionCount += count
	fmt.Println(post.ReactionCount)
	db.Save(&post)
}

func RemoveReactionFromPost(userId uint, postId uint) int {
	db := database.GetDB()
	var reaction model.Reaction

	if err := db.First(&reaction, "user_id = ? and post_id = ?", userId, postId).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return http.StatusOK
		} else {
			return http.StatusBadRequest
		}
	} else {
		if err := db.Delete(reaction).Error; err != nil {
			return http.StatusBadRequest
		} else {
			updatePostReactionCount(userId, postId, -1)
			return http.StatusOK
		}
	}
}

func GetReactionsUserList(postId uint) ([]model.User, int) {
	reactions := []model.Reaction{}
	db := database.GetDB()
	Profiles := []model.User{}
	if err := db.Where("post_id = ?", postId).Find(&reactions).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return Profiles, http.StatusOK
		} else {
			return Profiles, http.StatusBadRequest
		}
	} else {
		for _, reaction := range reactions {
			profile, _ := GetUserProfile(reaction.UserId)
			Profiles = append(Profiles, profile)
		}
		return Profiles, http.StatusOK
	}
}
