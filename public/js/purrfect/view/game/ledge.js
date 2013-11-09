/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        ledges,
        place,
        texture = new PIXI.Texture.fromImage('/img/bunny.png'),
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

            }
        }
    };

    place = function (x, y) {
        var ledge = new PIXI.Sprite(texture);
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