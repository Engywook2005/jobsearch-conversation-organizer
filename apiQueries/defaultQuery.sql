SELECT
    positions.*
	FROM (SELECT
			rawPosition.positionID AS ID,
            rawPosition.title AS title,
            recruiter.recruiterName AS recruiterName,
			employer.employerName AS employerName,
            rawPosition.lastStatusChange AS lastStatusChange,
            statuses.statusName AS currentStatus,
            rawPosition.resumeVersion AS resumeVersion
			FROM
            (SELECT
				*
            FROM
			specificposition
            WHERE
				lastStatusChange BETWEEN NOW() - INTERVAL 30 DAY AND NOW()
                AND status NOT IN(5, 11, 19)
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
		) 
	AS positions
    ORDER BY lastStatusChange;