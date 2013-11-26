/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        texture = PIXI.Texture.fromImage('/img/game.png'),
        background = new PIXI.Sprite(texture),


        init = function () {
            var stage = module.publish('purrfect.cache.get', 'gameStage');

            stage.addChildAt(background, 0);
        };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.background'), PIXI));