 /**
 * Created by Greg on 7/22/2017.
 */

const QueryConstants = {
    select : {
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
dateNamePosEmployerRecruiter.conversationTime 
        `
    }
}

module.exports = QueryConstants;