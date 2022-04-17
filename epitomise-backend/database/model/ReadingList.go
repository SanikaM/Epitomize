package model

type Readinglist struct {
	ID     uint `gorm:"primaryKey;auto_increment;not_null"`
	UserId uint `gorm:"unique"`
	Posts  []uint
}
