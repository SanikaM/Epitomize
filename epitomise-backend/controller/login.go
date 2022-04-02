package controller

import (
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/pilinux/gorest/database"
	"github.com/pilinux/gorest/database/model"
)

// LoginPayload ...
var jwtKey = []byte("my_secret_key")

type Claims struct {
	Username string `json:"username"`
	Userid   uint
	jwt.StandardClaims
}

func Login(login model.Login, test bool) model.LoginResponse {
	res := model.LoginResponse{}
	if test {
		db := database.GetDB()
		user := []model.User{}
		password := login.Password
		db.Where("Emailid   = ?", login.Emailid).Find(&user)
		if len(user) == 0 {
			res.Result = "Unauthorized user"
			return res
		}

		if !model.CheckPassword(password, user[0].Password) {
			res.Result = "Unauthorized user"
			return res
		}
		expirationTime := time.Now().Add(120 * time.Minute)
		claims := &Claims{
			Username: user[0].Emailid,
			Userid:   user[0].UserId,
			StandardClaims: jwt.StandardClaims{
				// In JWT, the expiry time is expressed as unix milliseconds
				ExpiresAt: expirationTime.Unix(),
			},
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			// If there is an error in creating the JWT return an internal server error
			res.Result = "Internal Server error"
			return res
		}
		res.Access_Token = tokenString
		res.Email = user[0].Emailid
		res.UserName = user[0].Username
		res.Result = "Successfully logged in."

		return res

	}
	return res
}
