"use strict";

var $ = require("elements")
var PrimeArray = require('prime-util/shell/array');

// Base from MooTools Core 1.4.5
$.implement({

    clone: function(contents, keepid) {
        var result = [];
        var formProps = {input: 'checked', option: 'selected', textarea: 'value'};

        for (var ni = 0, node; (node = this[ni]); ni++) {
            contents = contents !== false;
            var clone = node.cloneNode(contents), ce = [clone], te = [node], i;

            if (contents){
                PrimeArray.append(ce, PrimeArray.from(clone.getElementsByTagName('*')));
                PrimeArray.append(te, PrimeArray.from(node.getElementsByTagName('*')));
            }

            for (i = ce.length; i--;){
                var cnode = ce[i], element = te[i];
                if (!keepid) cnode.removeAttribute('id');
                /*<ltIE9>*/
                if (cnode.clearAttributes){
                    cnode.clearAttributes();
                    cnode.mergeAttributes(element);
                    cnode.removeAttribute('uniqueNumber');
                    if (cnode.options){
                        var no = cnode.options, eo = element.options;
                        for (var j = no.length; j--;) no[j].selected = eo[j].selected;
                    }
                }
                /*</ltIE9>*/
                var prop = formProps[element.tagName.toLowerCase()];
                if (prop && element[prop]) cnode[prop] = element[prop];
            }

            /*<ltIE9> Removed Temporarly
            if (Browser.ie){
                var co = clone.getElementsByTagName('object'), to = node.getElementsByTagName('object');
                for (i = co.length; i--;) co[i].outerHTML = to[i].outerHTML;
            }
            </ltIE9>*/

            result.push(clone);
        }

        return result;
    }

})

module.exports = $