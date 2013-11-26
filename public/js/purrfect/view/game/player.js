/*global _li, PIXI, jQuery*/

(function (module, PIXI, $) {
    'use strict';

    var moduleName = module.get('name'),
        init,
        currentPlayer,
        spinePlayer,
        toCanvas,
        render;

    init = function () {
        currentPlayer = module.publish('purrfect.cache.get', 'playerData');

        spinePlayer = new PIXI.Spine('/spine/skeleton.json');
        spinePlayer.skeleton.setSkinByName(currentPlayer.avatarName);
        spinePlayer.skeleton.setSlotsToSetupPose();
        spinePlayer.name = currentPlayer.name;
        spinePlayer.avatar = currentPlayer.avatarName;

        module.publish('purrfect.cache.set', {key: 'gamePlayer', value: spinePlayer});
    };

    toCanvas = function () {
        render(spinePlayer);
        module.publish('purrfect.controllers');
    };

    render = function (player) {
        var container = module.publish('purrfect.cache.get', 'gameContainer'),
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


    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.toCanvas', 'main', toCanvas);


}(_li.define('purrfect.view.game.player'), PIXI, jQuery));