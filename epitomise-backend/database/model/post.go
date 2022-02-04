package model

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

// Post model - `posts` table
type Post struct {
	gorm.Model
	// ID          uint `gorm:"primaryKey"`
	Type        string
	Title       string `gorm:"primaryKey"`
	Summary     string
	Content     string
	Linked_Post uint
	Status      string
	TagList     pq.StringArray `gorm:"type:text[]"`
}
