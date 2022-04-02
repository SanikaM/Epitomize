package model

// ErrorMsg ...
type ErrorResponse struct {
	HTTPCode int    `structs:"http_response_code" json:"-"`
	Message  string `structs:"msg" json:"msg"`
}
