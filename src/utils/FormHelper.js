const FormHelper = {
    debounceTimeout: 0,

    debounceAction:function (eTarget, callback, timeLimit = 200) {
        const startWaiting = function(targ) {
            if(FormHelper.debounceTimeout) {
                clearTimeout(FormHelper.debounceTimeout);
            }

            FormHelper.debounceTimeout = setTimeout(() => {
                callback(targ);
            }, timeLimit);
        }

        startWaiting(eTarget);
    }
}
module.exports = FormHelper;
