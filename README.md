# jobsearch-conversation-organizer

Keeps track of conversations I've had in the course of job searches 2017 and onward. Includes mysql server, express server, and front-end code.

# Getting Started

@TODO: Add a committed starter .sql kit where only a sample entry is in there.

_Important_: Before starting, you'll need a database. Add the jobConvosDump.sql file to `mySQLBackup/`

- Note: once the container is running and the database is populated, many files will be added to `db_data`. That's Docker doing its thing.

## Starting the container

1. Start Docker container: `docker-compose up -d`
1. Build the app: `yarn buildDev`
1. Start localhost server: `yarn startMySql`

- Note that the terminal will be dedicated to maintaining the server.

1. Hydrate database: `yarn restoreDB` @TODO is this necessary?

Then in browser go to http://localhost:8081

## Accessing the mySQL server from the command line

1. `docker exec -it mariadb-jobconvos /bin/bash`

- You are now interfacing with the mySQL server.

1. `mysql -u root -p jobConvos`

- You are now signed in to the mySQL server and can run SQL queries from the terminal window.

## Backing up database

_Important_: The database backup is not updated when adding to it. Therefore if you stop the docker container with new entries to the database, you'll want to export the database in its current state `jobConvos.sql` and store it in `db_data/mySQLBackup/`. Here's how to do that:

@TODO

## Using mySQL Workbench

- **Hostname**: 127.0.0.1
- **Port**: 3307
- **Username**: root@localhost
- **Password**: root

### Sample Query

```
SELECT
    positions.*
        FROM (SELECT
                        rawPosition.positionID AS ID,
                        rawPosition.employer AS employerID,
                        rawPosition.recruiter AS recruiterID,
            rawPosition.title AS title,
            rawPosition.link AS link,
                              rawPosition.remarks AS positionRemarks,
            employer.employerName AS employerName,
            recruiter.recruiterName AS recruiterName,
            roletypes.roleTypeName AS roleType,
            statuses.statusName AS currentStatus,
            rawPosition.lastStatusChange AS lastStatusChange,
            resumeVersions.resumeVersion AS resumeVersion,
            rawPosition.durationInWeeks AS duration
                        FROM
            (SELECT
                                *
            FROM
                        specificposition

                    WHERE
                    lastStatusChange BETWEEN NOW() - INTERVAL 7 DAY AND NOW()
                        AND status NOT IN(5, 11, 19, 27)
            )
            AS rawPosition
            INNER JOIN
            (SELECT
                                employerID,
                name AS employerName
                                FROM employer
            )
            AS employer
            ON
                                rawPosition.employer = employer.employerID
            INNER JOIN
            (SELECT
                recruiterID,
                name as recruiterName
                FROM recruiter
            )
            AS recruiter
            ON
                rawPosition.recruiter = recruiter.recruiterID
                        INNER JOIN
                        (SELECT
                                applicationStatusID,
                status AS statusName
                FROM applicationstatus
            )
            AS statuses
            ON statuses.applicationStatusID = rawPosition.status
            INNER JOIN
            (SELECT
                roleTypeID,
                type AS roleTypeName
                FROM roletypes
            )
            AS roletypes
            ON roletypes.roleTypeID = rawPosition.roletype
            INNER JOIN (SELECT
                resumeVersionID,
                resumeVersionTag as resumeVersion
                FROM resumeVersions
            )
            AS resumeVersions
            ON resumeVersions.resumeVersionID = rawPosition.resumeVersion
                )
        AS positions

    ORDER BY lastStatusChange DESC;
```
