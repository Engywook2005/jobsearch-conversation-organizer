module.exports = (positionID) => {
    return `
        SELECT 
        convoID,
        convoDate,
        convoTime, 
        convoType, 
        convoRemark,
        contactID,
        contactRole,
        lastName,
        firstName 
    FROM 
        (
        SELECT  
            convoID,
            convoDate, 
            convoTime,
            type AS convoType,
            contactID, 
            lastName, 
            firstName,
            linkedIn,
            contactType,
            convoRemark
         FROM (
            SELECT
                convos.conversationID AS convoID, 
                convos.conversationType AS convoType,
                convos.conversationDate AS convoDate,
                convos.conversationTime AS convoTime, 
                contacts.contactID AS contactID,
                contacts.lastName AS lastName,
                contacts.firstName AS firstName, 
                contacts.linkedIn AS linkedIn,
                contacts.email AS email, 
                contacts.phone AS phone, 
                contacts.contactType AS contactType,
                contacts.remark AS contactRemark,
                contacts.resumeLastSent AS resumeLastSent, 
                convos.remark AS convoRemark
             FROM
            (
                SELECT * FROM 
                    conversationmaintable
                WHERE 
                    specificPositionID = ${positionID}
            ) AS convos
            INNER JOIN 
            (
                SELECT * FROM 
                    contactlist
            ) AS contacts
            ON 
                contacts.contactID = convos.contactID    
        ) AS convoAndContact
        INNER JOIN 
        (
            SELECT 
                conversationTypeID, 
                type 
            FROM conversationtype
        )
        AS convotype 
        ON 
            convotype.conversationTypeID = convoAndContact.convoType
    ) AS convoTypeAndContact
    INNER JOIN 
    (
        SELECT 
            contactTypeID, 
            type AS contactRole
        FROM contacttype    
    ) AS contactType
    ON contactType.contactTypeID = convoTypeAndContact.contactType 
    ORDER BY 
        convoDate DESC,
        convoTime DESC
    ;
    `
    ;
};