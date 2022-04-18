package model

type Reaction struct {
	Id     uint `gorm:"primaryKey;auto_increment;not_null"`
	PostId uint `gorm:"foreignKey:PId"`
	UserId uint `gorm:"foreignKey:UId"`
}
