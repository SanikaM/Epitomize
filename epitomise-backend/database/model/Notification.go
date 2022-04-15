package model

import (
	"time"
)

// Post model - `posts` table
type Notification struct {
	NId       uint `gorm:"primaryKey;auto_increment;not_null"`
	Userid    uint
	Message   string `gorm:"unique"`
	CreatedAt time.Time
	Read      uint
}
