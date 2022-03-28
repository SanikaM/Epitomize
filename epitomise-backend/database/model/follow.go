package model

type Follow struct {
	ID              uint `gorm:"primaryKey;auto_increment;not_null"`
	FollowingUserId uint
	CurrentUserId   uint
}
