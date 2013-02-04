"use strict";

var $ = require('elements')

$.implement({

    empty: function(){

        for (var i = 0, node; (node = this[i]); i++) {
            var first
            while ((first = node.firstChild)) node.removeChild(first)
        }

        return this;
    }

})

module.exports = $
