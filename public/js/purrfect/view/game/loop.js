/*global _li, requestAnimationFrame*/

(function (module, requestAnimationFrame) {
    'use strict';

    var moduleName = module.get('name'),
        stage = null,
        renderer = null,
        tilings = null,
        collide,
        extraSpeed = 0,
        animate,
        init,
        jumpBoost = 1,
        counter = 0;

    init = function () {
        module.publish('purrfect.view.game.player.toCanvas');
        stage = module.publish('purrfect.cache.get', 'gameStage').cached;
        renderer = module.publish('purrfect.cache.get', 'gameRenderer').cached;
        tilings = module.publish('purrfect.cache.get', 'gameTiling').cached;
        requestAnimationFrame(animate);
    };

    collide = function (player) {
        if (player && player.position) {
            var ledges = module.publish('purrfect.cache.get', 'gameLedges').cached,
                hit = false;
            for (var i = 0; i < ledges.length; i += 1) {
                var ledge = ledges[i];

                var xdist = ledge.position.x - player.position.x;

                if (xdist > -ledge.width && xdist < ledge.width) {
                    var ydist = ledge.position.y - player.position.y;

                    if (ydist > -ledge.height && ydist < ledge.height && player.yspeed <= 0) {
                        player.ground = ledge.position.y;
                        player.position.y = ledge.position.y;
                        player.onGround = true;
                        player.yspeed = 0;
                        hit = true;
                        counter = 0;
                    }
                }
            }
            if (!hit) {
                player.ground = 580;
                player.onGround = false;
                if (player.position.y > 580) {
                    counter = 0;
                }
                // else {
                //     player.onGround = true;
                //     player.position.y = 580;
                // }
            }
        }
    };

    animate = function () {
        requestAnimationFrame(animate);
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            container = module.publish('purrfect.cache.get', 'gameContainer').cached,
            me = module.publish('purrfect.cache.get', 'gameMe').cached,
            playa;

        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                // collide(players[player]);

                if (players[player] !== players[me]) {
                } else {
                    collide(players[player]);
                    playa = players[me];
                    window.playa = playa;

                    // responding to keyboard
                    if (playa.keyPressed[37]) {
                        playa.xspeed -= 0.6;
                    } else if (playa.keyPressed[39]) {
                        playa.xspeed += 0.6;
                    } else {
                        if (playa.xspeed > 0) {
                            playa.xspeed -= 0.9;
                        } else if (playa.xspeed < 0) {
                            playa.xspeed += 0.9;
                        }
                        if (Math.abs(playa.xspeed) < 1 && playa.xspeed !== 0) {
                            playa.xspeed = 0;
                        }
                    }
                    if (playa.keyPressed[32] && counter < 10 || playa.position.y === 580 && playa.keyPressed[32]) {
                        jumpBoost = playa.xspeed === 0 ? 1 : Math.abs(playa.xspeed/25);
                        if (jumpBoost < 1) {
                            jumpBoost = 1;
                        }
                        playa.yspeed += 7*jumpBoost;
                        counter += 1;
                    }

                    // responding to boundaries
                    if (playa.position.x <= 60) {
                        playa.xspeed *= (-1);
                        playa.position.x = 61;
                    }
                    if (playa.position.x >= 720) {
                        playa.xspeed *= (-1);
                        playa.position.x = 719;
                    }

                    // limits
                    if (playa.xspeed > 20) {
                        playa.xspeed = 20;
                    }

                    // collisions
                    if (playa.position.y > 580) {
                        playa.yspeed = 0;
                        playa.position.y = 580;
                    } else if (playa.position.y !== 580 && playa.onGround === false) {
                        playa.yspeed -= 2;
                    }

                    if (player.onGround) {
                        playa.yspeed = 0;
                        playa.position.y = player.ground;
                    }

                    playa.position.x += playa.xspeed;
                    playa.position.y -= playa.yspeed;

                    module.publish('purrfect.communication.all.sendPlayer', players[player]);
                }
                players[player].nameTag.position.x = players[player].position.x;
                players[player].nameTag.position.y = players[player].position.y - 120;
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