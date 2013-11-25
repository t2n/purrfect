/*global _li, PIXI*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        getLine,
        generate;

    generate = function () {
        var counter = 0,
            level = [],
            powerup,
            output,
            i = 0;

        for (i; i < 299; i += 1) {
            powerup = getLine();
            counter += powerup.counter;
            level.push(powerup.line);
        }

        output = {
            powerupMap: level,
            powerupCounter: counter
        };

        return output;
    };


    getLine = function () {
        var line = [],
            powerup,
            result,
            counter = 0,
            i = 0;

        // change this to start getting another types of powerups
        // i.e. = 3; -> [1,2,3]; = 1 -> [1]
        var powerupTypes = 1;

        for (i; i < 11; i += 1) {
            powerup = Math.round(Math.random() / 1.985);
            if (powerup) {
                counter += 1;
                result = Math.round(Math.random() * powerupTypes + 1);
            } else {
                result = 0;
            }
            line.push(result);
        }
        return {
            line: line,
            counter: counter
        };
    };


    module.subscribe(moduleName, false, generate);


}(_li.define('purrfect.generators.powerups')));