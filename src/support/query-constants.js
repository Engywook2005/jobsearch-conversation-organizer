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
applicationStatus.status,
conversationType.type,
dateNamePosEmployerRecruiter.employerName,
dateNamePosEmployerRecruiter.recruiterName,
dateNamePosEmployerRecruiter.remark
FROM
(
	SELECT DISTINCT
	dateNamePos.conversationDate,
	dateNamePos.conversationTime, 
	dateNamePos.firstName,
	dateNamePos.lastName,
    dateNamePos.convoType,
    dateNamePos.remark,
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
        dateAndName.remark,
		specificPosition.title,
		specificPosition.employer,
		specificPosition.recruiter,
		specificPosition.status,
		specificPosition.lastStatusChange
		FROM (
			SELECT DISTINCT 
			convoTable.conversationDate AS conversationDate, 
			convoTable.conversationTime AS conversationTime,
			convoTable.specificPositionID AS positionID,
            convoTable.conversationType AS convoType,
            convoTable.remark AS remark,
			contactTable.firstName AS firstName,
			contactTable.lastName AS lastName
			FROM
				conversationMainTable AS convoTable
				INNER JOIN contactList AS contactTable
				ON contactTable.contactID = convoTable.contactID
		) AS dateAndName
		INNER JOIN specificPosition
		ON dateAndName.positionID = specificPosition.positionID
		WHERE specificPosition.status <> 5
	) AS dateNamePos
	INNER JOIN employer
	ON employer.employerID = dateNamePos.employer
	INNER JOIN recruiter
	ON recruiter.recruiterID = dateNamePos.recruiter
) AS dateNamePosEmployerRecruiter
INNER JOIN applicationStatus
ON applicationStatus.applicationStatusID = dateNamePosEmployerRecruiter.status
INNER JOIN conversationType
ON conversationType.conversationTypeID = dateNamePosEmployerRecruiter.convoType
#probably don't need these next three lines in the javascript but helpful in mysql workbench
ORDER BY
dateNamePosEmployerRecruiter.conversationDate,
dateNamePosEmployerRecruiter.conversationTime 
        `
    }
}

module.exports = QueryConstants;