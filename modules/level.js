/* globals exports, require */
var _ = require('lodash');

var defaults = {
    ledgesCount: Math.floor(Math.random() * (600 - 400 + 1)) + 400
};

exports.generate = function (config) {
    var lCount;
    config = config || {};
    _.defaults(config, defaults);

    lCount = config.ledgesCount;

    var level = [];
    var line = [];
    var last = 0;

    for (var i = 0; i < lCount; i += 1) {
        for (var n = 0; n < 10; n += 1) {
            if (last === 1) {
                last = Math.round(Math.random() + 0.6);
                line.push(last);
                last = 0;
            } else {
                last = Math.round(Math.random() - 0.2);
                line.push(last);

            }
        }
        level.push(line);
        line = [];
    }

    return level;
};