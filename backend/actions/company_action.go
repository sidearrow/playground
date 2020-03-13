package actions

import (
	"app/database"

	"github.com/gin-gonic/gin"
)

func CompanyAction(c *gin.Context) {
	rows := database.Exec("select company_code from companies")
	type Company struct {
		CompanyCode string `json:"companyCode"`
	}

	var companies = []Company{}
	for rows.Next() {
		var company Company
		rows.Scan(&company.CompanyCode)
		companies = append(companies, company)
	}

	c.JSON(200, companies)
}
