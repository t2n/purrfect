/*global _li, PIXI, jQuery*/

(function (module, PIXI, $) {
    'use strict';

    var moduleName = module.get('name'),
        playerTypes = ['/spine/skeleton.json'],
        currentType = 0,
        add,
        update,
        toCanvas,
        events,
        render;

    add = function (data) {
        var spinePlayers = {},
            players = data,
            id,
            isMe;

        for (var item in players) {

            id = players[item].id;

            spinePlayers[id] = new PIXI.Spine(playerTypes[currentType]);
            spinePlayers[id].id = id;
            spinePlayers[id].name = players[item].name;

            module.publish('purrfect.cache.set', {key: 'gamePlayers', value: spinePlayers});

        }

    };

    toCanvas = function () {
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            myID = module.publish('purrfect.cache.get', 'myPlayer').cached;
        for (var item in players) {
            render(players[item]);
            if (players[item].id === myID) {
                events();
            }
        }
    };

    update = function (data) {
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached;
        players[data.id].position.x = data.player.x;
        players[data.id].position.y = data.player.y;

        module.publish('purrfect.cache.set', {key: 'gamePlayers', value: players});

    };

    render = function (player) {
        var container = module.publish('purrfect.cache.get', 'gameContainer').cached,
        text = new PIXI.Text(player.name, {font: "16px Arial", fill: "white"});
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.position.y = player.position.y;
        text.position.x = player.position.x;
        container.addChild(text);

        player.nameTag = text;
        player.position.x = 500;
        player.position.y = 200;

        player.keyPressed = {};
        player.speedup = 0;
        player.lockJump = 0;
        player.fallingVelocity = 0;
        player.ground = 580;
        player.xspeed = 0;
        player.yspeed = 0;

        player.state.setAnimationByName('animation', true);

        container.addChild(player);
    };

    events = function () {
        var id = module.publish('purrfect.cache.get', 'myPlayer').cached,
            players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            me = players[id];
        $(document).keydown(function (e) {
            var k = e.keyCode;

            if (k >= 32 && k <= 40) {
                me.keyPressed[k] = true;
                e.preventDefault();
            }
        });

        $(document).keyup(function (e) {
            var k = e.keyCode;

            if (k >= 32 && k <= 40) {
                me.keyPressed[k] = false;
            }
        });

    };

    module.subscribe(moduleName + '.add', 'main', add);
    module.subscribe(moduleName + '.update', 'main', update);
    module.subscribe(moduleName + '.toCanvas', 'main', toCanvas);


}(_li.define('purrfect.view.game.player'), PIXI, jQuery));