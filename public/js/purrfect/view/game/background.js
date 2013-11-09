/*global _li, PIXI*/

(function (module, PIXI) {
    'use strict';

    var moduleName = module.get('name'),
        tiling = PIXI.Texture.fromImage('/img/game.png'),
        tilingSprite = new PIXI.Sprite(tiling),
        tiling2 = PIXI.Texture.fromImage('/img/starsFront.png'),
        tilingSprite2 = new PIXI.TilingSprite(tiling2, 800, 600),
        tiling3 = PIXI.Texture.fromImage('/img/starsMiddle.png'),
        tilingSprite3 = new PIXI.TilingSprite(tiling3, 800, 600),
        tiling4 = PIXI.Texture.fromImage('/img/starsBack.png'),
        tilingSprite4 = new PIXI.TilingSprite(tiling4, 800, 600),
        init;

    init = function () {
        var stage = module.publish('purrfect.cache.get', 'gameStage').cached,
            tilings = {
                bg: tilingSprite,
                sFront: tilingSprite2,
                sMiddle: tilingSprite3,
                sBack: tilingSprite4
            };
        module.publish('purrfect.cache.set', {key: 'gameTiling', value: tilings});


        stage.addChildAt(tilings.bg,0);

    };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.background'), PIXI));