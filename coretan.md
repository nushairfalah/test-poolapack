npx sequelize model:generate --name olympic_winner --attributes athlete:string,age:integer,countryId:integer,country_group:string,year:integer,date:date,sportId:integer,gold:integer,silver:integer,bronze:integer,total:integer

npx sequelize model:generate --name sport --attributes name:string

npx sequelize model:generate --name country --attributes name:string

target_key
source_key