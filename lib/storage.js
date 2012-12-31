/*
    Code from MooTools 1.4.5 Core
*/"use strict";

var elements = require("elements");
var Slick = require("slick");

var storage = {};
var get = function(uid){
    return (storage[uid] || (storage[uid] = {}));
};

// copied from kamicane's "elements" repository https://github.com/mootools/elements/blob/master/lib/elements.js
var uniqueIndex = 0
var uniqueID = function(n){
    return (n === global) ? "global" : n.uniqueNumber || (n.uniqueNumber = "st:" + (uniqueIndex++).toString(36));
}

elements.implement({

    retrieve: function(property, dflt) {
        var buffer = [];

        for (var i = 0, node; node = this[i]; i++) {
            var storage = get(uniqueID(node)), prop = storage[property];
            if (dflt !== null && prop === null) prop = storage[property] = dflt;
            buffer.push(prop !== null ? prop : null);
        }
        
        return buffer;
    },

    store: function(property, value) {

        for (var i = 0, node; node = this[i]; i++) {
            var storage = get(uniqueID(node));
            storage[property] = value;
        }

        return this;
    },

    eliminate: function(property) {
        for (var i = 0, node; node = this[i]; i++) {
            var storage = get(uniqueID(node));
            delete storage[property];
        }
        
        return this;
    }

});

module.exports = elements;