# jobsearch-conversation-organizer

Keeps track of conversations I've had in the course of job searches 2017 and onward. Includes mysql server, express server, and front-end code.

# Getting Started

@TODO: Add a committed starter .sql kit where only a sample entry is in there.

_Important_: Before starting, you'll need a database. Add the jobConvosDump.sql file to `db_data/mySQLBackup/`

- Note: once the container is running and the database is populated, many more files will be added to `db_data`. That's Docker doing its thing.

## Starting the container

1. Start Docker container: `docker-compose up -d`
1. Build the app: `yarn buildDev`
1. Start localhost server: `yarn startMySql`

- Note that the terminal will be dedicated to maintaining the server.

1. Hydrate database: `yarn restoreDB`

Then in browser go to http://localhost:8081

## Accessing the mySQL server from the command line

1. `docker exec -it mariadb-jobconvos /bin/bash`

- You are now interfacing with the mySQL server.

1. `mysql -u root -proot jobConvos`

- You are now signed in to the mySQL server.
