"use strict";
var $ = require('elements')

$.implement({
    get: function(key) {
        var buffer = []
        for (var i = 0, node; (node = $(this[i])); i++) {
            var value
            switch (key) {
                case 'type':
                    value = node.type()
                    break
                case 'value':
                    value = node.value()
                    break
                case 'name':
                    value = node.name()
                    break
                case 'title':
                    value = node.title()
                    break
                case 'id':
                    value = node.id()
                    break
                case 'checked':
                    value = node.checked()
                    break
                case 'disabled':
                    value = node.disabled()
                    break
                case 'selected':
                    value = node.selected()
                default:
                    value = node.attribute(key)
            }

            buffer.push(value)
        }

        return buffer.length > 1 ? buffer : buffer[0]
    },

    set: function(key, value) {
        for (var i = 0, node; (node = $(this[i])); i++) {
            if (key == 'checked' && value === true) {
                node.check()
                continue
            }

            if (key == 'checked' && value === false) {
                node.uncheck()
                continue
            }

            if (key == 'disabled' && value === true) {
                node.disable()
                continue
            }

            if (key == 'disabled' && value === false) {
                node.enable()
                continue
            }

            if (key == 'selected' && value === true) {
                node.select()
                continue
            }

            if (key == 'selected' && value === false) {
                node.deselect()
                continue
            }

            node.attribute(key, value)
        }
    }
})

module.exports = $