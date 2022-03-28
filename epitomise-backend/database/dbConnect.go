package database

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DB global variable to access gorm
var DB *gorm.DB

// InitDB - function to initialize db
func InitDB() *gorm.DB {
	var db = DB
	db, err := gorm.Open(sqlite.Open("/Users/ankitkulkarni/Desktop/database.db"), &gorm.Config{})
	if err != nil {
		panic("Error in Database connection")
	}
	if err == nil {
		fmt.Println("DB connection successful!")
	}
	DB = db
	return DB
}

// GetDB - get a connection
func GetDB() *gorm.DB {
	return DB
}
