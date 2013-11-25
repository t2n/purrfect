/*global _li, PIXI, jQuery*/

(function (module, PIXI, $) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        currentPlayer,
        spinePlayer,
        toCanvas,
        events,
        render;

    init = function () {
        currentPlayer = module.publish('purrfect.cache.get', 'playerData').cached;

        spinePlayer = new PIXI.Spine('/spine/skeleton.json');
        spinePlayer.skeleton.setSkinByName(currentPlayer.avatarName);
        spinePlayer.skeleton.setSlotsToSetupPose();
        spinePlayer.name = currentPlayer.name;
        spinePlayer.avatar = currentPlayer.avatarName;

        module.publish('purrfect.cache.set', {key: 'gamePlayer', value: spinePlayer});
    };

    toCanvas = function () {
        render(spinePlayer);
        events();

    };

    render = function (player) {
        var container = module.publish('purrfect.cache.get', 'gameContainer').cached,
            text = new PIXI.Text(player.name, {font: '16px Arial', fill: 'white'});

        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.position.y = player.position.y;
        text.position.x = player.position.x;
        container.addChild(text);

        player.nameTag = text;
        player.position.x = 80 * Math.random() * 10 + 1;
        player.position.y = 100;
        player.scale.x = 0.45;
        player.scale.y = 0.45;

        player.keyPressed = {};
        player.speedup = 0;
        player.lockJump = 0;
        player.fallingVelocity = 0;
        player.ground = 580;
        player.xspeed = 0;
        player.yspeed = 0;
        player.score = 0;
        player.oldY = 0;
        player.oldX = 0;

        player.state.setAnimationByName('idle', true);

        container.addChild(player);
    };

    events = function () {

        $(document).keydown(function (e) {
            var k = e.keyCode;

            if (k === 37) {
                spinePlayer.scale.x = -0.45;
            }

            if (k === 39) {
                spinePlayer.scale.x = 0.45;
            }

            if (k >= 32 && k <= 40) {
                if (!spinePlayer.keyPressed[k]) {
                    spinePlayer.flying = true;
                    spinePlayer.state.setAnimationByName('animation', true);
                }
                spinePlayer.keyPressed[k] = true;
                e.preventDefault();
            }
        });

        $(document).keyup(function (e) {
            var k = e.keyCode;

            if (k >= 32 && k <= 40) {
                if (!spinePlayer.flying) {
                    spinePlayer.state.setAnimationByName('idle', true);
                }
                spinePlayer.keyPressed[k] = false;
            }
            if (k === 32) {
                spinePlayer.lockJump = false;
            }
        });

    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.toCanvas', 'main', toCanvas);


}(_li.define('purrfect.view.game.player'), PIXI, jQuery));