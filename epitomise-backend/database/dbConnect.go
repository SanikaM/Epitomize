package database

import (
	"fmt"

	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DB global variable to access gorm
var DB *gorm.DB

// InitDB - function to initialize db
func InitDB() *gorm.DB {
	var db = DB
	godotenv.Load("../../.env")
	val := os.Getenv("DBPATH")
	hardcode := "/Users/ankitkulkarni/Desktop/database.db"
	if val == hardcode {
		fmt.Println("Tho Problem Kya hai")
	}
	fmt.Println(val)
	db, err := gorm.Open(sqlite.Open(hardcode), &gorm.Config{})
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
