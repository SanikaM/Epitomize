package model

import "github.com/lib/pq"

type Readinglist struct {
	ID     uint          `gorm:"primaryKey;auto_increment;not_null"`
	UserId uint          `gorm:"foreignKey:UId"`
	Posts  pq.Int64Array `gorm:"type:integer[]"`
}
