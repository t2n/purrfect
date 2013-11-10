/* globals exports */

function getLine(fullLine) {
    var last = 0;
    var line = [];
    for (var n = 0; n < 11; n += 1) {
        if (fullLine) {
            line.push(1);
        } else {
            if (last === 1) {
                last = Math.round(Math.random() + 0.6);
                line.push(last);
                last = 0;
            } else {
                last = Math.round(Math.random() - 0.2);
                line.push(last);
            }
        }
    }
    return line;
}

exports.generate = function() {
    // config = config || {};
    // _.defaults(config, defaults);

    var level = [];
    var i = 0;
    // first level
    level.push(getLine(true));
    for (i = 0; i < 99; i += 1) {
        level.push(getLine());
    }

    // seconds level
    level.push(getLine(true));
    for (i = 0; i < 99; i += 1) {
        level.push(getLine());
    }
    // third level
    level.push(getLine(true));
    for (i = 0; i < 99; i += 1) {
        level.push(getLine());
    }
    // finish
    level.push(getLine(true));

    return level;
};