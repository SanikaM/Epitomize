package model

type Tag struct {
	TagUId uint   `gorm:"primaryKey;auto_increment;not_null"`
	Type   string `gorm:"unique"`
}
