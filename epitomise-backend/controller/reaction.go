package controller

import (
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
	if err := db.Create(&reaction).Error; err != nil {
		//Increment reaction count in posts table
		updatePostReactionCount(postId, 1)
		return http.StatusOK
	} else {
		return http.StatusBadRequest
	}
}

func updatePostReactionCount(postId uint, count int) {
	post, _ := GetPost(uint64(postId), true)
	db := database.GetDB()
	post.ReactionCount += count
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
			updatePostReactionCount(postId, -1)
			return http.StatusOK
		}
	}
}

func GetReactionsUserList(postId uint) ([]model.User, int) {
	Users := []model.User{}
	db := database.GetDB()
	Profiles := []model.User{}
	if err := db.Where("post_id = ?", postId).Find(&Users).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return Users, http.StatusOK
		} else {
			return Users, http.StatusBadRequest
		}
	} else {
		for _, user := range Users {
			profile, _ := GetUserProfile(user.UserId)
			Profiles = append(Profiles, profile)
		}
		return Profiles, http.StatusOK
	}
}
