/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        load,
        textures = [new PIXI.Texture.fromImage('/img/rainbow.png')],
        init;

    init = function () {
        load();
    };

    load = function () {
        var rainbow = new PIXI.Sprite(textures[0]);

        rainbow.anchor.x = 0.5;
        rainbow.anchor.y = 0.5;

        module.publish('purrfect.cache.set', {key: 'gameRainbow', value: rainbow});
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.rainbow'), PIXI));