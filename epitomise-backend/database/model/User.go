package model

import (
	"fmt"
	"time"

	"github.com/alexedwards/argon2id"

	"github.com/pilinux/gorest/config"
)

type User struct {
	UserId         uint `gorm:"primaryKey;auto_increment;not_null"`
	Username       string
	About          string
	Emailid        string `json:"Emailid"`
	Password       string `json:"Password"`
	Profilepicture string
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      time.Time
}

// HashPass for password
func HashPass(pass string) string {
	fmt.Print(pass)
	configureHash := config.Security().HashPass
	params := &argon2id.Params{
		Memory:      configureHash.Memory * 1024, // the amount of memory used by the Argon2 algorithm (in kibibytes)
		Iterations:  configureHash.Iterations,    // the number of iterations (or passes) over the memory
		Parallelism: configureHash.Parallelism,   // the number of threads (or lanes) used by the algorithm
		SaltLength:  configureHash.SaltLength,    // length of the random salt. 16 bytes is recommended for password hashing
		KeyLength:   configureHash.KeyLength,     // length of the generated key (or password hash). 16 bytes or more is recommended
	}
	h, err := argon2id.CreateHash(pass, params)
	if err != nil {
		return "error"
	}
	return h
}

func CheckPassword(password string, hashe string) bool {
	match, err := argon2id.ComparePasswordAndHash(password, hashe)
	if err != nil {
		fmt.Println(err)
	}
	return match
}
