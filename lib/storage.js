/*
    Code from MooTools 1.4.5 Core
*/"use strict";

var elements = require("elements");
var Slick = require("slick");

// copied from kamicane's "elements" repository https://github.com/mootools/elements/blob/master/lib/elements.js
var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "st:" + (uniqueIndex++).toString(36));
}

elements.implement({

    __getStorage: function(uid) {
        this.__storage = this._storage || {};
        return (this.__storage[uid] || (this.__storage[uid] = {}));
    },

    retrieve: function(property, dflt) {
        var buffer = [];

        for (var i = 0, node; (node = this[i]); i++) {
            var storage = this.__getStorage(uniqueID(node)), prop = storage[property];
            if (dflt !== null && prop === null) prop = storage[property] = dflt;
            buffer.push(prop !== null ? prop : null);
        }
        
        return this.length > 1 ? buffer : buffer[0];
    },

    store: function(property, value) {

        for (var i = 0, node; (node = this[i]); i++) {
            var storage = this.__getStorage(uniqueID(node));
            storage[property] = value;
        }

        return this;
    },

    eliminate: function(property) {
        for (var i = 0, node; (node = this[i]); i++) {
            var storage = this.__getStorage(uniqueID(node));
            delete storage[property];
        }
        
        return this;
    }

});

module.exports = elements;