/*global _li, PIXI*/

(function (module) {
    'use strict';

    var moduleName = module.get('name');

    function getLine(fullLine) {
        var last = 0;
        var line = [];
        var n;

        var prev, current, next;

        var blocks = {
            empty: 0,
            mid: 1,
            left: 2,
            right: 3,
            foreveralone: 4
        };

        for (n = 0; n < 11; n += 1) {

            if (fullLine) {
                line[n] = blocks.mid;
            } else {
                if (last === 1) {
                    last = Math.round(Math.random() + 1);
                    if (last) {
                        last = blocks.mid;
                    } else {
                        last = blocks.empty;
                    }
                    line[n] = last;
                    last -= Math.round(Math.random() + 0.1);
                } else {
                    last = Math.round(Math.random() - 0.2);
                    if (last === 0) {
                        last = blocks.empty;
                    } else {
                        last = blocks.mid;
                    }
                    line[n] = last;
                }
            }
        }
        if (!fullLine) {
            for (n = 0; n < 11; n += 1) {
                current = line[n];

                if (n === 0) {
                    prev = null;
                    next = line[n + 1];
                } else if (n === 10) {
                    next = null;
                    prev = line[n - 1];
                } else {
                    prev = line[n - 1];
                    next = line[n + 1];
                }

                if (n === 0 && current !== blocks.empty && next === blocks.empty) {
                    line[n] = blocks.right;
                }
                if (n === 10 && current !== blocks.empty && prev === blocks.empty) {
                    line[n] = blocks.left;
                }

                if (n !== 0 && n !== 10 && prev !== blocks.empty && current !== blocks.empty) {
                    if (next === blocks.empty) {
                        line[n] = blocks.right;
                    } else {
                        line[n] = blocks.mid;
                    }
                }
                if (n !== 0 && n !== 10 && prev === blocks.empty && current !== blocks.empty) {
                    if (next !== blocks.empty) {
                        line[n] = blocks.left;
                    }
                }
                if (n !== 0 && n !== 10 && prev === blocks.empty && current !== blocks.empty && next === blocks.empty) {
                    line[n] = blocks.foreveralone;
                }
            }
        }

        return line;
    }

    var generate = function () {
        var level = [],
            n;
        // first level
        level.push(getLine(true));
        for (n = 0; n < 49; n += 1) {
            level.push(getLine());
        }

        // seconds level
        level.push(getLine(true));
        for (n = 0; n < 49; n += 1) {
            level.push(getLine());
        }
        // third level
        level.push(getLine(true));
        for (n = 0; n < 49; n += 1) {
            level.push(getLine());
        }

        // fourth level
        level.push(getLine(true));
        for (n = 0; n < 49; n += 1) {
            level.push(getLine());
        }

        // fifth level
        level.push(getLine(true));
        for (n = 0; n < 49; n += 1) {
            level.push(getLine());
        }

        // finish
        level.push(getLine(true));

        return level;
    };

    module.subscribe(moduleName, 'main', generate);


}(_li.define('purrfect.view.game.level')));