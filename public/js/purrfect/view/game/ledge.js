/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        ledges,
        place,
        renderedLedges = [],
        texture = new PIXI.Texture.fromImage('/img/terrain.png'),
        init;

    init = function () {
        load();
    };

    load = function () {
        var i = 0,
            j = 0,
            ledge,
            ground;

        for (i; i < ledges.length; i += 1) {
            j = 0;
            ledge = ledges[i];
            for (j; j < ledge.length; j += 1) {
                ground = ledge[j];
                place(i, j, ground);
            }
        }

        module.publish('purrfect.cache.set', {key: 'gameLedges', value: renderedLedges});
    };

    place = function (row, column, render) {
        if (render) {
            var ledge = new PIXI.Sprite(texture),
                container = module.publish('purrfect.cache.get', 'gameContainer').cached;

            ledge.position.x = 80 * column;
            ledge.position.y = 420 - 200 * row;
            ledge.originalPosition = {
                x: 80 * column,
                y: 420 - 200 * row
            };

            ledge.anchor.x = 0.5;
            ledge.anchor.y = 0.5;
            renderedLedges.push(ledge);
            container.addChildAt(ledge, 0);

        }
    };

    ledges = [
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0]
    ];

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.ledge'), PIXI));