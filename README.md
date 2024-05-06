# dashboard-be

## Setup

`nvm use`

`npm i`

`docker-compose up`

`npm run start`

Db explorer runs on : http://localhost:8081/db/dashboard/
Server runs on: http://localhost:3001

### test data

`npm run populate` inserts records in the DB from the file located in /scripts

Date for each entry is from March to May generated in a random fashion.

### Design decisions

REST APIs for retrieving and getting data
MongoDB for flexibility

Things that were left out for time concerns

- Login and Registration, so each user has its own metrics
