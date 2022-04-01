package model

import "github.com/lib/pq"

type SearchResponse struct {
	PostsUId uint
	Type     string
	Title    string
	Summary  string
	TagList  pq.StringArray `gorm:"type:text[]"`
}
