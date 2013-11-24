/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        ledges,
        place,
        renderedLedges = [],
        textures = [],
        init,
        initLedges;

    init = function () {
        ledges = module.publish('purrfect.cache.get', 'gameData').cached.room.level;
        load();
    };

    initLedges = function () {
        for (var i = 0; i < 6; i+=1) {
            textures[i] = {
                'left': new PIXI.Texture.fromImage('/img/' + i + '_ledge/left.png'),
                'right': new PIXI.Texture.fromImage('/img/' + i + '_ledge/right.png'),
                'middle': new PIXI.Texture.fromImage('/img/' + i + '_ledge/middle.png'),
                'alone': new PIXI.Texture.fromImage('/img/' + i + '_ledge/alone.png')
            };
        }
    };

    load = function () {
        var i = 0,
            j = 0,
            position,
            lastPosition = 520,
            apart = 170, //was 200
            ledge,
            ground,
            ledgesLength;

        initLedges();

        ledgesLength = ledges.length;
        for (i; i < ledgesLength; i += 1) {
            if (i > 100) {
                apart = 220; //was 250
            }
            if (i > 200) {
                apart = 250; //was 300
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
        if (render && (textures[Math.floor(i/50)] !== undefined)) {
            var ledge,
                container = module.publish('purrfect.cache.get', 'gameContainer').cached;

            if (render === 1) {
                ledge = new PIXI.Sprite(textures[Math.floor(i/50)].middle);
            } else if (render === 2) {
                ledge = new PIXI.Sprite(textures[Math.floor(i/50)].left);
            } else if (render === 3) {
                ledge = new PIXI.Sprite(textures[Math.floor(i/50)].right);
            } else {
                ledge = new PIXI.Sprite(textures[Math.floor(i/50)].foreveralone);
            }

            ledge.position.x = 80 * column;
            ledge.position.y = position;

            ledge.originalPosition = {
                x: 80 * column,
                y: position
            };

            ledge.render = true;
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