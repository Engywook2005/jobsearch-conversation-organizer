/**
 * Created by Greg on 6/16/2017.
 */

const NetworkingResources = require('./networking');
const ParsingResources = require('./parsing');

const networkerInstance = new NetworkingResources.JSONNetworking();

const networkSuccessCallback = function(data, err) {
    if(err) {
        //handle and get out
        console.log("ooooooops!!!! " + err.message);
    } else if(data) {
        console.log(data);
        const jsonParser = new ParsingResources.JSONParsing(window.document);
        const outputTable = jsonParser.writeTableFromData(data);
        document.getElementById('mainContent').appendChild(outputTable);
    }
};

// TODO break out the logic a bit more here?
networkerInstance.loadJSON("http://localhost:8097/", networkSuccessCallback);

module.exports.NetworkingResouces = NetworkingResources;