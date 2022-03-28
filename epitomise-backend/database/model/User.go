package model

import (
	"time"
)

type User struct {
	UserId         uint `gorm:"primaryKey;auto_increment;not_null"`
	Username       string
	About          string
	Emailid        string
	Password       string
	Profilepicture string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      time.Time
	PostID         uint
	Posts          Post `gorm:"foreignkey:PostID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
