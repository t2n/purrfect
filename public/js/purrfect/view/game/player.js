/*global _li, PIXI, jQuery*/

(function (module, PIXI, $) {
    'use strict';

    var moduleName = module.get('name'),
        playerTypes = ['/spine/skeleton.json'],
        currentType = 0,
        add,
        events,
        render;

    add = function (data) {
        if (data.main) {
            data = data.main;
        }
        var player = new PIXI.Spine(playerTypes[currentType]),
            players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            id = data.id,
            isMe = data.isMe;

        if (isMe) {
            module.publish('purrfect.cache.set', {key: 'gameMe', value: id});
        }

        if (!players) {
            players = {};
        }

        players[id] = player;
        module.publish('purrfect.cache.set', {key: 'gamePlayers', value: players});

        if (currentType < playerTypes.length) {
            currentType += 1;
        } else {
            currentType = 0;
        }

        render(player);
        events();
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

            if (k >= 37 && k <= 40) {
                me.keyPressed[k] = true;

                if (k === 37) {
                    module.publish('purrfect.physics.left', me);
                }
                if (k === 38) {
                    module.publish('purrfect.physics.up', me);
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

            if (k >= 37 && k <= 40) {
                me.keyPressed[k] = false;
                me.velocity = 0;
                if (!me.keyPressed[37] && !me.keyPressed[39]) {
                    me.targetPosition.x = me.position.x;
                }

                if (!me.keyPressed[38] && !me.keyPressed[40]) {
                    me.targetPosition.y = me.position.y;
                }
            }
        });

    };

    module.subscribe(moduleName + '.add', 'main', add);


}(_li.define('purrfect.view.game.player'), PIXI, jQuery));