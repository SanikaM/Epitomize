package model

type PostTag struct {
	PostTagID uint `gorm:"primaryKey;auto_increment;not_null"`
	PostId    uint `gorm:"foreignKey:PId"`
	TagId     uint `gorm:"foreignKey:TId"`
}
