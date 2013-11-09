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
        init;

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

                    if (ydist > -ledge.height && ydist < ledge.height) {
                        player.ground = ledge.position.y;
                        hit = true;

                    }
                }
            }
            if (!hit) {
                player.ground = 580;
            }
        }
    };

    animate = function () {
        requestAnimationFrame(animate);
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            container = module.publish('purrfect.cache.get', 'gameContainer').cached,
            me = module.publish('purrfect.cache.get', 'gameMe').cached,
            myplayer, leftBoundary, rightBoundary, leftKeyDown, rightKeyDown;

        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                collide(players[player]);
                module.publish('purrfect.physics.gravity', players[player]);
                if (players[player] === players[me]) {
                    myplayer = players[player];

                    leftBoundary = (myplayer.position.x <= 60);
                    rightBoundary = (myplayer.position.x >= 720);
                    leftKeyDown = myplayer.keyPressed[37];
                    rightKeyDown = myplayer.keyPressed[39];

                    if (leftBoundary || rightBoundary) {
                        // bounce from the wall
                        myplayer.xspeed = -myplayer.xspeed;
                        if (leftBoundary) {
                            myplayer.position.x = 61;
                        } else if (rightBoundary) {
                            myplayer.position.x = 719;
                        }

                        myplayer.xspeed /= 1.2;
                    }

                    // count momentum
                    if (leftKeyDown) {
                        myplayer.xspeed -= 0.4;
                    } else if (rightKeyDown) {
                        myplayer.xspeed += 0.4;
                    } else {
                        myplayer.xspeed *= 0.95;

                        if (Math.abs(myplayer.xspeed) < 0.2) {
                            myplayer.xspeed = 0;
                        }
                    }

                    // calculate position according to xspeed
                    myplayer.position.x += myplayer.xspeed;
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