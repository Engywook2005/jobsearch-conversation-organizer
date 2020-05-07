class TimeUtils {

    static getDateForForm(date) {
        date = (typeof date === 'string') ? new Date(date) : date;

        const formatMonth = (dateObj) => {
                const month = dateObj.getMonth() + 1,
                    monthString = month < 10 ? `0${month}` : `${month}`;

                return monthString;
            },
            formatDateTimeStamp = function(ts) {
                return ts < 10 ? `0${ts}` : `${ts}`;
            };

        return `${date.getFullYear()}-${formatMonth(date)}-${formatDateTimeStamp(date.getDate())}T${formatDateTimeStamp(date.getHours())}:${formatDateTimeStamp(date.getMinutes())}`
    }
}

module.exports = TimeUtils;