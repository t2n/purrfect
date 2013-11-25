/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        $document = $(document),
        init,
        spinePlayer,
        startMove,
        stopMove;

    init = function () {
        spinePlayer = module.publish('purrfect.cache.get','gamePlayer');

        $document.keydown(function (e) {
            startMove(e);
        });

        $document.keyup(function (e) {
            stopMove(e);
        });
    };


    startMove = function (e) {
        var k = e.keyCode;

        if (k === 37) {
            spinePlayer.movingLeft = true;
            spinePlayer.movingRight = false;
            spinePlayer.scale.x = -0.45;
        }

        if (k === 39) {
            spinePlayer.movingRight = true;
            spinePlayer.movingLeft = false;
            spinePlayer.scale.x = 0.45;
        }

        if (k === 32) {
            spinePlayer.jumping = true;
        }

        if (k >= 32 && k <= 40) {
            if (!spinePlayer.moving) {
                spinePlayer.flying = true;
                spinePlayer.state.setAnimationByName('animation', true);
            }
            spinePlayer.moving = true;
            e.preventDefault();
        }
    };

    stopMove = function (e) {
        var k = e.keyCode;

        if (k === 37) {
            spinePlayer.movingLeft = false;
        }

        if (k === 39) {
            spinePlayer.movingRight = false;
        }

        if (k >= 32 && k <= 40) {
            if (!spinePlayer.flying) {
                spinePlayer.state.setAnimationByName('idle', true);
            }
            spinePlayer.moving = false;
        }
        if (k === 32) {
            spinePlayer.lockJump = false;
            spinePlayer.jumping = false;

        }
    };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.controllers.keyboard')));