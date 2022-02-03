package model

import (
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	ID   uint   `gorm:"primaryKey"`
	Type string `gorm:"primaryKey"`
}
