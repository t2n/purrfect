/*global _li, PIXI*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        getLine,
        generate;

    generate = function () {
        var level = [],
            fullLine = false,
            n = 0;

        for (n; n < 301; n += 1) {
            if (n % 50 === 0) {
                fullLine = true;
            }
            level.push(getLine(fullLine));
            fullLine = false;
        }

        return level;
    };


    getLine = function (fullLine) {
        var last = 0,
            line = [],
            i = 0,
            prev,
            current,
            next,
            blocks = {
                empty: 0,
                mid: 1,
                left: 2,
                right: 3,
                foreveralone: 4
            };

        for (i; i < 11; i += 1) {

            if (fullLine) {
                line[i] = blocks.mid;
            } else {
                if (last === 1) {
                    last = Math.round(Math.random() + 1);
                    if (last) {
                        last = blocks.mid;
                    } else {
                        last = blocks.empty;
                    }
                    line[i] = last;
                    last -= Math.round(Math.random() + 0.1);
                } else {
                    last = Math.round(Math.random() - 0.2);
                    if (last === 0) {
                        last = blocks.empty;
                    } else {
                        last = blocks.mid;
                    }
                    line[i] = last;
                }
            }
        }
        if (!fullLine) {
            for (i = 0; i < 11; i += 1) {
                current = line[i];

                if (i === 0) {
                    prev = null;
                    next = line[i + 1];
                } else if (i === 10) {
                    next = null;
                    prev = line[i - 1];
                } else {
                    prev = line[i - 1];
                    next = line[i + 1];
                }

                if (i === 0 && current !== blocks.empty && next === blocks.empty) {
                    line[i] = blocks.right;
                }
                if (i === 10 && current !== blocks.empty && prev === blocks.empty) {
                    line[i] = blocks.left;
                }

                if (i !== 0 && i !== 10 && prev !== blocks.empty && current !== blocks.empty) {
                    if (next === blocks.empty) {
                        line[i] = blocks.right;
                    } else {
                        line[i] = blocks.mid;
                    }
                }
                if (i !== 0 && i !== 10 && prev === blocks.empty && current !== blocks.empty) {
                    if (next !== blocks.empty) {
                        line[i] = blocks.left;
                    }
                }
                if (i !== 0 && i !== 10 && prev === blocks.empty && current !== blocks.empty && next === blocks.empty) {
                    line[i] = blocks.foreveralone;
                }
            }
        }

        return line;
    };

    module.subscribe(moduleName, false, generate);


}(_li.define('purrfect.generators.level')));