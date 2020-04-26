class Ajax {
    static doAjaxQuery(url) {
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();

            xhttp.onloadend = function() {
                if(this.status === 200 || this.status === 304) {
                    resolve(this.responseText);
                }
                else {
                    reject('Not a response we can use');
                }
            };

            xhttp.open('GET', url, true);
            xhttp.send();
        });
    }
}

export default Ajax;