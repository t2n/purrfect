/*global _li, requestAnimationFrame*/

(function (module, requestAnimationFrame) {
    'use strict';

    var moduleName = module.get('name'),
        stage = null,
        renderer = null,
        collide,
        extraSpeed = 0,
        comboTimeout,
        animate,
        init;

    init = function () {
        stage = module.publish('purrfect.cache.get', 'gameStage').cached;
        renderer = module.publish('purrfect.cache.get', 'gameRenderer').cached;
        requestAnimationFrame(animate);
    };

    collide = function (player) {
        var ledges = module.publish('purrfect.cache.get', 'gameLedges').cached,
            hit = false;
        for (var i = 0; i < ledges.length; i += 1) {
            var ledge = ledges[i];

            var xdist = ledge.position.x - player.position.x;

            if (xdist > -ledge.width && xdist < ledge.width) {
                var ydist = ledge.position.y - player.position.y;

                if (ydist > -ledge.height && ydist < ledge.height) {
                    player.ground = ledge.position.y;
                    hit = true;
                    extraSpeed += 0.5;
                    if (player.bounciness === 4) {
                        comboTimeout = window.setTimeout(function () {
                            extraSpeed = 0;
                        }, 500);
                    }
                }
            }
        }
        if (!hit) {
            player.ground = 580;
        }
    };

    animate = function () {
        requestAnimationFrame(animate);
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            container = module.publish('purrfect.cache.get', 'gameContainer').cached,
            me = module.publish('purrfect.cache.get', 'gameMe').cached;

        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                collide(players[player]);
                module.publish('purrfect.physics.gravity', players[player]);
                if (players[player] !== players[me]) {
                    //TODO connect to socket for other players' positions
                } else {
                    if (players[player].targetPosition.x < players[player].position.x) {
                        if (players[player].keyPressed[37]) {
                            players[player].velocity += 0.2;
                        } else {
                            players[player].velocity = 0;
                        }
                        if (players[player].position.x > 60) {
                            players[player].position.x -= 8 + players[player].speedup + 1.2 * players[player].velocity;
                        }
                    }

                    if (players[player].targetPosition.x > players[player].position.x) {
                        if (players[player].keyPressed[39]) {
                            players[player].velocity += 0.2;
                        } else {
                            players[player].velocity = 0;
                        }
                        if (players[player].position.x < 720) {
                            players[player].position.x += 8 + players[player].speedup + 1.2 * players[player].velocity;
                        }
                    }

                    if (players[player].targetPosition.y < players[player].position.y) {
                        if (players[player].keyPressed[38] || players[player].keyPressed[32]) {
                            players[me].lockJump = 1;
                            players[player].position.y -= extraSpeed + players[player].speedup + 0.5 * players[player].velocity + 1.5 * players[player].speedup;
                        }
                    }
                    if (players[player].targetPosition.y > players[player].position.y) {
                        if (players[player].keyPressed[40]) {
                            players[player].position.y += 8 + 0.5 * players[player].velocity;
                        }
                    }
                    module.publish('purrfect.communication.players.send', players[player]);
                }
            }
        }
        container.position.y = -players[me].position.y + 300;

        if (container.position.y < 0) {
            container.position.y = 0;
        }

        renderer.render(stage);
    };

    module.subscribe(moduleName, 'main', init);


}(_li.define('purrfect.view.game.loop'), requestAnimationFrame));