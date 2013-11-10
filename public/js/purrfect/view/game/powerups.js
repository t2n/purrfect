/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        powerups,
        place,
        renderedPowerups = [],
        textures = [new PIXI.Texture.fromImage('/img/bunny.png')],
        init;

    init = function () {
        powerups = module.publish('purrfect.cache.get', 'gameData').cached.room.powerups.powerupMap;
        load();
    };

    load = function () {
        var i = 0,
            j = 0,
            position,
            lastPosition = 320,
            apart = 270, //was 200
            powerup,
            ground,
            powerupsLength;

        powerupsLength = powerups.length;
        for (i; i < powerupsLength; i += 1) {
            if (i > 100) {
                apart = 320; //was 250
            }
            if (i > 200) {
                apart = 340; //was 300
            }
            position = lastPosition - apart;
            lastPosition = position;
            j = 0;
            powerup = powerups[i];
            for (j; j < powerup.length; j += 1) {
                ground = powerup[j];
                place(i, position, j, ground, powerupsLength);
            }
        }
        module.publish('purrfect.cache.set', {key: 'gamePowerups', value: renderedPowerups});
    };

    place = function (i, position, column, render, powerupsLength) {
        if (render) {
            var powerup = new PIXI.Sprite(textures[0]),
                container = module.publish('purrfect.cache.get', 'gameContainer').cached;

            powerup.position.x = 80 * column;
            powerup.position.y = position;
            powerup.originalPosition = {
                x: 80 * column,
                y: position
            };

            powerup.anchor.x = 0.5;
            powerup.anchor.y = 0.5;
            renderedPowerups.push(powerup);
            container.addChildAt(powerup, 0);

            if (i === powerupsLength - 1) {
                powerup.lastLevel = true;
            } else {
                powerup.lastLevel = false;
            }
        }
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.powerups'), PIXI));