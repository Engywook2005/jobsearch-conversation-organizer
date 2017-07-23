/**
 * Created by Greg on 7/22/2017.
 */

class JSONNetworking {
    constructor() {
        //nothing to do here?
    }

    getJSONP(url, success) {
        const ud = '_' + Math.floor(Math.random() * 9999999999999),
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0]
            || document.documentElement;

        //has to be called from the loaded JavaScript
        window[ud] = function(data) {
            //todo error callback
            //script is removed after data is captured
            head.removeChild(script);
            success && success(data);
        };

        script.src = url.replace('cb=?', 'cb=' + ud);
        head.appendChild(script);
    }


    loadJSON(path, callback = function(data, err) {
        console.log("default callback");
        console.log(data);
        console.log(err);
    }) {
        console.log(path);
        this.getJSONP(path + "&cb=?", function(data, err) {
            console.log("data received!");
            const decodedData = decodeURIComponent(data);
            const dataToJSON = JSON.parse(decodedData);
            callback(dataToJSON, err);
        });
    }
}

module.exports = JSONNetworking;