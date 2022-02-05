package model

import (
	"time"

	"github.com/lib/pq"
)

// Post model - `posts` table
type Post struct {
	PostsUId    uint `gorm:"primaryKey;auto_increment;not_null"`
	Type        string
	Title       string `gorm:"unique"`
	Summary     string
	Content     string
	Linked_Post uint
	Status      string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	TagList     pq.StringArray `gorm:"type:text[]"`
}
