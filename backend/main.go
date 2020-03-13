package main

import (
	"app/actions"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/company", actions.CompanyAction)

	r.Run()
}
