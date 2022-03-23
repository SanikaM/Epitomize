package model

import (
	"time"

	"github.com/lib/pq"
)

type User struct {
	UserId         uint `gorm:"primaryKey;auto_increment;not_null"`
	Username       string
	Password       string
	Profilepicture string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      time.Time
	Posts          []Post         `gorm:"foreignkey:IDuser;references:UserId:constraint:onUpdate:CASCADE,onDelete:CASCADE" json:",omitempty"`
	Following      pq.StringArray `gorm:"type:uint[]"`
	FollowedBy     pq.StringArray `gorm:"type:uint[]"`
}
