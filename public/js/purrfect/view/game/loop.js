/*global _li, requestAnimationFrame, console*/

(function (module, requestAnimationFrame, $) {
    'use strict';

    var moduleName = module.get('name'),
        stage = null,
        renderer = null,
        tilings = null,
        collide,
        gameFinished = false,
        frameCounter = 0,
        powerupCollide,
        drawScores,
        $score,
        $players,
        scoreChanged = false,
        updateScore,
        setupScreen,
        animate,
        init,
        jumpBoost = 1,
        counter = 0,
        finishGame,
        activatePowerup;

    init = function () {
        module.publish('purrfect.view.game.player.toCanvas');
        $score = $('.js__score');
        $players = $('.js__players');
        stage = module.publish('purrfect.cache.get', 'gameStage').cached;
        renderer = module.publish('purrfect.cache.get', 'gameRenderer').cached;
        tilings = module.publish('purrfect.cache.get', 'gameTiling').cached;
        setupScreen();

        requestAnimationFrame(animate);

    };

    setupScreen = function () {
        $('#purrfectContainer').addClass('inGame');
        $('body').addClass('inGame');
    };

    collide = function (player) {

        if (player && player.position) {
            var ledges = module.publish('purrfect.cache.get', 'gameLedges').cached,
                hit = false,
                container = module.publish('purrfect.cache.get', 'gameContainer').cached;

            for (var i = 0; i < ledges.length; i += 1) {
                var ledge = ledges[i];

                if (ledge) {
                    var xdist = ledge.position.x - player.position.x;

                    if (xdist > -ledge.width && xdist < ledge.width) {
                        var ydist = ledge.position.y - player.position.y;

                        if (ydist > -ledge.height && ydist < ledge.height && player.yspeed < 0) {
                            player.ground = ledge.position.y;
                            player.position.y = ledge.position.y;
                            player.onGround = true;
                            player.lockJump = 0;
                            player.yspeed = 0;
                            hit = true;
                            counter = 0;
                            if (ledge.lastLevel) {
                                module.publish('purrfect.communication.all.gameFinished', player.name);
                            }

                            updateScore(player, ledge.position.y);
                        }

                    }
                    // if ledge is too far, remove it
                    if (ledge.parent && Math.abs(ledge.position.y-player.position.y)/80 > 50) {
                        ledge.parent.removeChild(ledge);
                    } else if (ledge.parent === undefined && Math.abs(ledge.position.y-player.position.y)/80 < 50) {
                        container.addChildAt(ledge, 0);
                    }
                }
            }
            if (!hit) {
                player.ground = 580;
                player.onGround = false;
                if (player.position.y > 580) {
                    counter = 0;
                }
            }
        }
    };

    powerupCollide = function (player) {
        if (player && player.position) {
            var powerups = module.publish('purrfect.cache.get', 'gamePowerups').cached;
            for (var i = 0; i < powerups.length; i += 1) {
                var powerup = powerups[i],
                    xdist, ydist;

                if (powerup === undefined) {
                    continue;
                }

                // anim
                if (Math.abs(powerup.scaleTo - powerup.blend.scale.y) <= 0.01) {
                    var random = Math.round(Math.random() * Math.random() * 100 + 80) / 100;
                    powerup.scaleTo = random;
                }

                if (powerup.scaleTo < powerup.blend.scale.x) {
                    powerup.blend.scale.x -= 0.01;
                    powerup.blend.scale.y -= 0.01;
                }

                if (powerup.scaleTo > powerup.blend.scale.x) {
                    powerup.blend.scale.x += 0.01;
                    powerup.blend.scale.y += 0.01;
                }

                if (powerup.powerup.rotation > 0.5) {
                    powerup.rotateTo = -0.6;
                }
                if (powerup.powerup.rotation < -0.5) {
                    powerup.rotateTo = 0.6;
                }

                if (powerup.rotateTo < 0) {
                    powerup.powerup.rotation -= 0.02;

                } else {
                    powerup.powerup.rotation += 0.02;

                }

                // player collision
                xdist = powerup.powerup.position.x - player.position.x;

                if (xdist > -powerup.width && xdist < powerup.width) {
                    ydist = powerup.powerup.position.y - player.position.y;

                    if (ydist > -powerup.height && ydist < powerup.height) {
                        // powerup hit
                        activatePowerup(player, powerup, powerups, i);
                    }
                }
            }
        }
    };


    updateScore = function (player, score) {
        player.score = 10000 + (10 * -score);
        scoreChanged = true;
        $score.text(player.score);
    };

    activatePowerup = function(player, powerup, powerups, i) {
        var container = module.publish('purrfect.cache.get', 'gameContainer').cached;
        var powerupType = powerup.type;
        container.removeChild(powerup.powerup);
        delete powerups[i];

        switch (powerupType) {
        case 1:
            player.yspeed += 50;
            break;
        default:
            player.yspeed += 50;
            // console.log('Cannot recognize powerup type: '+powerupType);
            break;
        }
    };

    drawScores = function (players) {
        var scoreBoard = {};
        if (scoreChanged) {

            for (var player in players) {
                if (players.hasOwnProperty(player)) {
                    scoreBoard[players[player].id] = {};
                    scoreBoard[players[player].id].score = players[player].score;
                    scoreBoard[players[player].id].name = players[player].name;
                }
            }
            var sortable = [];
            for (var scoreItem in scoreBoard) {
                if (scoreBoard.hasOwnProperty(scoreItem)) {
                    sortable.push([scoreBoard[scoreItem].name, scoreBoard[scoreItem].score]);
                }
            }
            sortable.sort(function (a, b) {
                return a[1] < b[1];
            });

            $players.empty();

            for (var i = 0; i < sortable.length; i += 1) {
                var $scoreItem = $(document.createElement('div')),
                    $scoreItemPlayer = $(document.createElement('h3')),
                    $scoreItemPoint = $(document.createElement('span'));

                $scoreItemPoint.text(sortable[i][1]);
                $scoreItemPlayer.text(sortable[i][0] + ': ').append($scoreItemPoint);
                $scoreItem.append($scoreItemPlayer);

                scoreChanged = false;
                $players.append($scoreItem);

            }
        }
    };

    animate = function () {

        requestAnimationFrame(animate);
        frameCounter += 1;

        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached,
            container = module.publish('purrfect.cache.get', 'gameContainer').cached,
            me = module.publish('purrfect.cache.get', 'myPlayer').cached,
            playa,
            scores = [];

        if (players && Object.keys(players).length === 1 && !gameFinished) {
            module.publish('purrfect.communication.all.gameFinished', players[me].name);
        }

        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                // collide(players[player]);

                if (players[player] === players[me]) {
                    scores.push(players[player].score);
                    collide(players[player]);
                    powerupCollide(players[player]);
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
                    if (!playa.lockJump && playa.keyPressed[32] && counter < 10 || playa.position.y === 580 && playa.keyPressed[32]) {
                        jumpBoost = (playa.xspeed === 0 ? 1 : Math.abs(playa.xspeed / 20));
                        if (jumpBoost < 1) {
                            jumpBoost = 1;
                        }
                        playa.yspeed += 6 * jumpBoost;
                        counter += 1;
                    }

                    // responding to boundaries
                    if (playa.position.x <= 40) {
                        playa.xspeed *= (-1);
                        playa.position.x = 41;
                    }
                    if (playa.position.x >= 750) {
                        playa.xspeed *= (-1);
                        playa.position.x = 749;
                    }
                    module.publish('purrfect.communication.all.sendPlayer', players[player]);
                    container.position.y = -players[player].position.y + 300;

                    // limits
                    if (playa.xspeed > 30) {
                        playa.xspeed = 30;
                    }
                    if (playa.xspeed < -30) {
                        playa.xspeed = -30;
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

                    if (frameCounter % 2 === 0) {
                        if (players[player].oldX !== players[player].position.x && players[player].oldY !== players[player].position.y) {
                            module.publish('purrfect.communication.all.sendPlayer', players[player]);
                        }
                        players[player].oldX = players[player].position.x;
                        players[player].oldY = players[player].position.y;
                    }
                }
                players[player].nameTag.position.x = players[player].position.x;
                players[player].nameTag.position.y = players[player].position.y - 120;
            }
        }


        if (frameCounter >= 60) {
            drawScores(players);
            frameCounter = 0;
        }

        if (container.position.y < 0) {
            container.position.y = 0;
        }

        renderer.render(stage);
    };

    finishGame = function () {
        gameFinished = true;
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.finishGame', 'main', finishGame);


}(_li.define('purrfect.view.game.loop'), requestAnimationFrame, jQuery));