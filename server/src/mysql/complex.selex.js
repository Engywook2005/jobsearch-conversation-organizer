/**
 * For when the query has enough parts that it's better to just hardcode the damned thing.
 * @type {{}}
 */
const ComplexSelex = {

  /**
   * Finds specified employer, recruiter, or contact.
   *
   * @param {String}  filterBy  Which table to search.
   * @param {String}  lookFor   What we are looking for in the table specified by filterBy.
   */
  findFilter: function(filterBy, lookFor) {
    const queries = {
      Employer: `
        SELECT 
          employerID AS id,
          name AS value
        FROM employer
        WHERE 
          name LIKE '%${lookFor}%' 
        ;
      `,
      Recruiter: `
        SELECT
          recruiterID AS id,
          name AS value
        FROM recruiter
        WHERE
          name LIKE '%${lookFor}%'
        ;
      `,
      Contact: `
        SELECT 
          contactID as id,
          CONCAT(firstName, ' ', lastName) AS value
        FROM contactlist
        WHERE
          CONCAT(firstName, ' ', lastName) LIKE '%${lookFor}%'          
      `
    }

    return queries[filterBy];
  }
}

module.exports = ComplexSelex;
