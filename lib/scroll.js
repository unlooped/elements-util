"use strict";

var $ = require("elements")

$.implement({

    getScroll: function(){
        var result = []

        for (var i = 0, node; (node = this[i]); i++) {
            if (isBody(node) || node === window) {
                result.push({x: window.pageXOffset || document.scrollLeft || 0, y: window.pageYOffset || document.scrollTop || 0})
            } else {
                result.push({x: this.scrollLeft, y: this.scrollTop})
            }
        }

        return result.length > 1 ? result : result[0];
    }

})

function isBody(element){
    return (/^(?:body|html)$/i).test(element.tagName);
}

module.exports = $