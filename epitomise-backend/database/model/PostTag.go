package model

type PostTag struct {
	ID     uint `gorm:"primaryKey"`
	PostId uint `gorm:"many2many:posttag_postid;ForeignKey:postid;References:id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	TagId  uint `gorm:"many2many:posttag_tagid;ForeignKey:tagid;References:id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
