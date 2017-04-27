"use strict";

function StockStream() {
    const url = "ws://localhost:8011/stomp";
    this.client = Stomp.client(url);

    this.successHandlers = [];
    this.errorHandlers = [];
    console.log('run');

    // Change this to get detailed logging from the stomp library
    global.DEBUG = false

    this.client.debug = function(msg) {
      if (global.DEBUG) {
        console.info(msg)
      }
    }
    
}

StockStream.prototype = {
    subscribe : function(successCallback, errorCallback, finallyCallback) {

        this.successHandlers.push(successCallback);
        this.errorHandlers.push(errorCallback);
        let self = this;

         function connectCallback() {
            let subscription = self.client.subscribe('/fx/prices', subscribedCallback);
        }

        function subscribedCallback(message) {
            //console.log("[StockStream] - ", message);
            self.successHandlers.forEach(function(callback) {
                callback(message);
            });
        }

        this.client.connect({}, connectCallback, function(error) {
            alert(error.headers.message);
        });

       
    }
}

module.exports = StockStream;