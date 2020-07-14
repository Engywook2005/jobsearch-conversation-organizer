class Ajax {
    static doAjaxQuery(url) {
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();

            // @TODO Use https.get instead - would also need to be able to serve https.
            xhttp.onloadend = function() {
                if(this.status === 200 || this.status === 304) {
                    resolve(this.responseText);
                }
                else {
                    reject(`Not a response we can use: ${this.status}`);
                }
            };

            xhttp.open('GET', url, true);
            xhttp.send();
        });
    }
}

export default Ajax;
