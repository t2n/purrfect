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
        var spinePlayers ={},
            players = data,
            id,
            isMe;

        for (var item in players) {

            id = players[item].id;
            isMe = players[item].isMe;

            if (isMe) {
                module.publish('purrfect.cache.set', {key: 'gameMe', value: id});
            }
            spinePlayers[id] = new PIXI.Spine(playerTypes[currentType]);
            spinePlayers[id].id = id;
            spinePlayers[id].isMe = isMe;
            spinePlayers[id].name = players[item].name;
            console.log(spinePlayers[id].name);
            module.publish('purrfect.cache.set', {key: 'gamePlayers', value: spinePlayers});

        }

    };

    toCanvas = function () {
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached;
        for (var item in players) {
            render(players[item]);
            if (players[item].isMe) {

                events(players[item].id);
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
        var container = module.publish('purrfect.cache.get', 'gameContainer').cached;

        player.position.x = 200;
        player.position.y = 500;

        player.targetPosition = {
            x: 200,
            y: 200
        };

        player.keyPressed = {};
        player.velocity = 0;
        player.bounciness = 4;
        player.speedup = 0;
        player.lockJump = 0;
        player.fallingVelocity = 0;
        player.ground = 580;

        player.state.setAnimationByName('animation', true);

        container.addChild(player);
    };

    events = function () {
        var id = module.publish('purrfect.cache.get', 'gameMe').cached,
            players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            me = players[id];

        $(document).keydown(function (e) {
            var k = e.keyCode;

            if (k >= 32 && k <= 40) {
                me.keyPressed[k] = true;

                if (k === 37) {
                    module.publish('purrfect.physics.left', me);
                }
                if (k === 38 || k === 32) {
                    if (!me.lockJump) {
                        module.publish('purrfect.physics.up', me);
                    }
                }
                if (k === 39) {
                    module.publish('purrfect.physics.right', me);
                }
                if (k === 40) {
                    module.publish('purrfect.physics.down', me);
                }
                e.preventDefault();
            }
        });

        $(document).keyup(function (e) {
            var k = e.keyCode;

            if (k >= 32 && k <= 40) {
                me.keyPressed[k] = false;
                me.velocity = 0;
                if (!me.keyPressed[37] && !me.keyPressed[39]) {
                    me.targetPosition.x = me.position.x;
                }

                if (!me.keyPressed[38] && !me.keyPressed[32] && !me.keyPressed[40]) {
                    me.lockJump = 0;
                    me.targetPosition.y = me.position.y;
                }
            }
        });

    };

    module.subscribe(moduleName + '.add', 'main', add);
    module.subscribe(moduleName + '.update', 'main', update);
    module.subscribe(moduleName + '.toCanvas', 'main', toCanvas);


}(_li.define('purrfect.view.game.player'), PIXI, jQuery));