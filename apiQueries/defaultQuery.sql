SELECT
    positions.*
	FROM (SELECT
			rawPosition.positionID AS ID,
            rawPosition.title AS title,
            employer.employerName AS employerName,
            recruiter.recruiterName AS recruiterName,
            roletypes.roleTypeName AS roleType,
            statuses.statusName AS currentStatus,
            rawPosition.lastStatusChange AS lastStatusChange,
            resumeVersions.resumeVersion AS resumeVersion
			FROM
            (SELECT
				*
            FROM
			specificposition
            WHERE
				lastStatusChange BETWEEN NOW() - INTERVAL 21 DAY AND NOW()
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