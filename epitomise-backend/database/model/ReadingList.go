package model

type Readinglist struct {
	UserId uint `gorm:"unique"`
	Posts  []uint
}
