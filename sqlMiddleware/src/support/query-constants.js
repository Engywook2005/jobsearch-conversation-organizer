// @TODO need to have macros for some of the filters. May want to look at last 30 days by default, but may want to also be able to look back further
// OR could just set those as variables
const QueryConstants = {
    select : {
        activePositions : `
SELECT
    positions.*
	FROM (SELECT
			rawPosition.positionID AS ID,
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
        `,

        // @TODO filter and use for the right side.
        conversationMainTable : `
        SELECT DISTINCT 
dateNamePosEmployerRecruiter.conversationDate,
dateNamePosEmployerRecruiter.conversationTime, 
dateNamePosEmployerRecruiter.firstName,
dateNamePosEmployerRecruiter.lastName,
dateNamePosEmployerRecruiter.title,
dateNamePosEmployerRecruiter.lastStatusChange,
applicationstatus.status,
conversationtype.type,
dateNamePosEmployerRecruiter.employerName,
dateNamePosEmployerRecruiter.recruiterName
FROM
(
	SELECT DISTINCT
	dateNamePos.conversationDate,
	dateNamePos.conversationTime, 
	dateNamePos.firstName,
	dateNamePos.lastName,
    dateNamePos.convoType,
	dateNamePos.title,
	dateNamePos.status,
	dateNamePos.lastStatusChange,
	employer.name AS employerName,
	recruiter.name AS recruiterName
	FROM
	(
		SELECT DISTINCT
		dateAndName.conversationDate,
		dateAndName.conversationTime,
		dateAndName.firstName,
		dateAndName.lastName,
        dateAndName.convoType,
		specificposition.title,
		specificposition.employer,
		specificposition.recruiter,
		specificposition.status,
		specificposition.lastStatusChange
		FROM (
			SELECT DISTINCT 
			convoTable.conversationDate AS conversationDate, 
			convoTable.conversationTime AS conversationTime,
			convoTable.specificPositionID AS positionID,
            convoTable.conversationType AS convoType,
			contactTable.firstName AS firstName,
			contactTable.lastName AS lastName
			FROM
				conversationmaintable AS convoTable
				INNER JOIN contactlist AS contactTable
				ON contactTable.contactID = convoTable.contactID
		) AS dateAndName
		INNER JOIN specificposition
		ON dateAndName.positionID = specificposition.positionID
	) AS dateNamePos
	INNER JOIN employer
	ON employer.employerID = dateNamePos.employer
	INNER JOIN recruiter
	ON recruiter.recruiterID = dateNamePos.recruiter
) AS dateNamePosEmployerRecruiter
INNER JOIN applicationstatus
ON applicationstatus.applicationStatusID = dateNamePosEmployerRecruiter.status
INNER JOIN conversationtype
ON conversationtype.conversationTypeID = dateNamePosEmployerRecruiter.convoType
#probably don't need these next three lines in the javascript but helpful in mysql workbench
ORDER BY
dateNamePosEmployerRecruiter.conversationDate,
dateNamePosEmployerRecruiter.conversationTime`,
        employers:
        `
        SELECT * from employer
        ORDER BY name;
        `,
        recruiters:
        `
        SELECT * FROM recruiter
        ORDER BY name;
        `,
        positionTypes:
        `
        SELECT * FROM roletypes;
        `,
        applicationStatus:
        `
        SELECT * FROM applicationstatus
        ORDER BY progression;
        `,
        resumeVersions:
        `
        SELECT * FROM resumeVersions
        ORDER BY resumeVersionTag DESC
        `,
        positionData:
        `
        SELECT * FROM specificposition
        `,
        conversations:
        `
        SELECT * FROM conversationmaintable
        `
    }
};

module.exports = QueryConstants;