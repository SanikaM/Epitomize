package model

type UserList struct {
	UserId   uint `gorm:"primaryKey;auto_increment;not_null"`
	Username string
	About    string
}
