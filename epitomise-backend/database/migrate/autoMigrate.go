// autoMigrate.go needs to be executed only when it is required

package main

import (
	"fmt"

	"gorm.io/gorm"

	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

// Load all the models
type Tag model.Tag
type PostTag model.PostTag
type post model.Post
type user model.User
type follow model.Follow

var db *gorm.DB
var errorState int

func main() {

	/*
	** 0 = default/no error
	** 1 = error
	**/

	errorState = 0
	db = database.InitDB()

	// Auto migration
	/*
		- Automatically migrate schema
		- Only create tables with missing columns and missing indexes
		- Will not change/delete any existing columns and their types
	*/

	// Careful! It will drop all the tables!
	dropAllTables()
	//db.Migrator().DropTable(&post{}, &Tag{}, &PostTag{})
	// Automatically migrate all the tables
	migrateTables()

	// Manually set foreign keys for MySQL and PostgreSQL
	//db.Migrator().DropTable(&post{}, &Tag{}, &PostTag{})
	if errorState == 0 {
		fmt.Println("Auto migration is completed!")
	} else {
		fmt.Println("Auto migration failed!")
	}
}

func dropAllTables() {
	// Careful! It will drop all the tables!
	if err := db.Migrator().DropTable(&Tag{}, &PostTag{}, &post{}, &user{}, &follow{}); err != nil {
		errorState = 1
		fmt.Println(err)
	} else {
		fmt.Println("Old tables are deleted!")
	}
}

func migrateTables() {

	if err := db.AutoMigrate(&Tag{},
		&post{}, &PostTag{}, &user{}, &follow{}); err != nil {
		errorState = 1
		fmt.Println(err)
	} else {
		fmt.Println("New tables are  migrated successfully!")
	}

}
