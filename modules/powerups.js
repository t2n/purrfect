/* globals exports */

function getLine() {
    var line = [];
    var powerup;
    var result;
    var counter = 0;
    for (var n = 0; n < 11; n += 1) {
        powerup = Math.round(Math.random() / 1.998);
        if (powerup) {
            counter +=1;
            result = Math.round(Math.random() * 3 + 1);
        } else {
            result = 0;
        }
        line.push(result);
    }
    return {
        line: line,
        counter: counter
    };
}

exports.generate = function() {
    var counter = 0;
    var level = [];
    var powerup;
    for (var i = 0; i < 299; i += 1) {
        powerup = getLine();
        counter += powerup.counter;
        level.push(powerup.line);
    }
    return {
        powerupMap: level,
        powerupCounter: counter
    };
};