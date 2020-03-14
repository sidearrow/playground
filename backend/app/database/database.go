package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Exec(query string) *sql.Rows {
	db, err := sql.Open("mysql", "root@/stations")
	defer db.Close()
	if err != nil {
		panic(err.Error())
	}

	rows, err := db.Query(query)
	if err != nil {
		panic(err.Error())
	}

	return rows
}
