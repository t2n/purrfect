/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        ledges,
        place,
        renderedLedges = [],
        textures = [new PIXI.Texture.fromImage('/img/terrain.png'),
            new PIXI.Texture.fromImage('/img/terrain2.png'),
            new PIXI.Texture.fromImage('/img/terrain3.png'),
            new PIXI.Texture.fromImage('/img/terrain4.png'),
            new PIXI.Texture.fromImage('/img/terrain5.png'),
            new PIXI.Texture.fromImage('/img/terrain.png')],
        init;

    init = function () {
        ledges = module.publish('purrfect.cache.get', 'gameData').cached.room.level;
        load();
    };

    load = function () {
        var i = 0,
            j = 0,
            position,
            lastPosition = 520,
            apart = 270, //was 200
            ledge,
            ground,
            ledgesLength;

        ledgesLength = ledges.length;
        for (i; i < ledgesLength; i += 1) {
            if (i > 100) {
                apart = 320; //was 250
            }
            if (i > 200) {
                apart = 340; //was 300
            }
            position = lastPosition - apart;
            lastPosition = position;
            j = 0;
            ledge = ledges[i];
            for (j; j < ledge.length; j += 1) {
                ground = ledge[j];
                place(i, position, j, ground, ledgesLength);
            }
        }
        module.publish('purrfect.cache.set', {key: 'gameLedges', value: renderedLedges});
    };

    place = function (i, position, column, render, ledgesLength) {
        if (render) {
            var ledge = new PIXI.Sprite(textures[Math.floor(i/100)]),
                container = module.publish('purrfect.cache.get', 'gameContainer').cached;

            ledge.position.x = 80 * column;
            ledge.position.y = position;
            ledge.originalPosition = {
                x: 80 * column,
                y: position
            };

            ledge.anchor.x = 0.5;
            ledge.anchor.y = 0.5;
            renderedLedges.push(ledge);
            container.addChildAt(ledge, 0);

            if (i === ledgesLength - 1) {
                ledge.lastLevel = true;
            } else {
                ledge.lastLevel = false;
            }
        }
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.ledge'), PIXI));