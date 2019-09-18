"use strict";
exports.__esModule = true;
var pug = require('pug');
function compileTemplate(view, data) {
    return pug.renderFile("templates/" + view + ".pug", data || {
        title: 'My Masteries'
    });
}
exports.compileTemplate = compileTemplate;
