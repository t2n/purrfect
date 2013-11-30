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
        maxSpeed = 20,
        $player,
        scoreChanged = false,
        updateScore,
        setupScreen,
        goingUp = 0.1,
        animate,
        init,
        jumpBoost = 1,
        counter = 0,
        finishGame,
        timeout,
        container,
        createTimeout,
        resetTimeout,
        activatePowerup,
        langoliers,
        renderRainbow,
        scoresAddedBefore = false;


    createTimeout = function () {
        timeout = window.setTimeout(function () {
            maxSpeed = 20;
        }.bind(module), 900);
    };

    resetTimeout = function () {
        window.clearTimeout(timeout);
        createTimeout();
    };

    createTimeout();

    init = function () {
        langoliers = new PIXI.Graphics();

        langoliers.beginFill(0xFF0000);

        langoliers.moveTo(0, 490);
        langoliers.lineTo(0, 491);
        langoliers.lineTo(800, 491);
        langoliers.lineTo(800, 490);


        langoliers.endFill();


        module.publish('purrfect.view.game.player.toCanvas');
        $player = $('.js__players');
        stage = module.publish('purrfect.cache.get', 'gameStage');
        renderer = module.publish('purrfect.cache.get', 'gameRenderer');
        tilings = module.publish('purrfect.cache.get', 'gameTiling');
        container = module.publish('purrfect.cache.get', 'gameContainer');
        container.addChild(langoliers);
        requestAnimationFrame(animate);

    };

    collide = function (player) {

        if (player && player.position) {
            var ledges = module.publish('purrfect.cache.get', 'gameLedges'),
                hit = false;
            for (var i = 0; i < ledges.length; i += 1) {
                var ledge = ledges[i];

                if (ledge && ledge.render) {
                    var xdist = ledge.position.x - player.position.x + 40;

                    if (xdist - 80 > -ledge.width && xdist < ledge.width) {
                        var ydist = ledge.position.y - player.position.y;

                        if (ydist > -ledge.height && ydist < ledge.height && player.yspeed < 0) {
                            player.position.y = ledge.position.y;
                            player.ground = Math.floor(player.position.y);
                            player.onGround = true;
                            player.yspeed = 0;
                            if (player.flying && !(player.movingLeft || player.movingRight)) {
                                player.flying = false;
                                player.state.setAnimationByName('idle', true);
                            }
                            if (ledge.lastLevel) {
                                goingUp = 0;
                                module.publish('purrfect.view.result', player.score);
                                gameFinished = true;
                            }
                            hit = true;
                            counter = 0;

                            if (!gameFinished) {
                                updateScore(player, ledge.position.y);
                            }
                        }

                    }
                }

                if (ledge) {
                    if (ledge.parent && Math.abs(ledge.position.y - player.position.y) / 80 > 10) {
                        ledge.parent.removeChild(ledge);
                    } else if (ledge.parent === undefined && Math.abs(ledge.position.y - player.position.y) / 80 < 10) {
                        container.addChildAt(ledge, 0);
                        ledge.render = true;
                    }
                    if (ledge.parent && ledge.position.y - 490 > langoliers.position.y) {
                        ledge.render = false;
                        ledge.parent.removeChild(ledge);
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
            var powerups = module.publish('purrfect.cache.get', 'gamePowerups');
            for (var i = 0; i < powerups.length; i += 1) {
                var powerup = powerups[i],
                    xdist, ydist;

                if (powerup === undefined) {
                    continue;
                }

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

                xdist = powerup.powerup.position.x - player.position.x;

                if (xdist > -powerup.width && xdist < powerup.width) {
                    ydist = powerup.powerup.position.y - player.position.y;

                    if (ydist > -powerup.height && ydist < powerup.height) {
                        activatePowerup(player, powerup, powerups, i);
                    }
                }

                if (powerup.parent && Math.abs(powerup.position.y - player.position.y) / 80 > 8) {
                    powerup.parent.removeChild(powerup);
                } else if (powerup.parent === undefined && Math.abs(powerup.position.y - player.position.y) / 80 < 8) {
                    container.addChildAt(powerup, 0);
                }
            }

        }
    };


    updateScore = function (player, score) {
        player.score = 10000 + (10 * -score);
        scoreChanged = true;
    };

    activatePowerup = function (player, powerup, powerups, i) {
        var powerupType = powerup.type;
        if (powerup.powerup.parent) {
            powerup.powerup.parent.removeChild(powerup.powerup);
        }
        delete powerups[i];

        switch (powerupType) {
            case 1:
                player.yspeed += 50;
                player.addChild(module.publish('purrfect.cache.get', 'gameRainbow'));
                break;
            default:
                player.yspeed += 50;
                player.addChild(module.publish('purrfect.cache.get', 'gameRainbow'));
                break;
        }
    };

    renderRainbow = function (player) {
        var rainbow = module.publish('purrfect.cache.get', 'gameRainbow');

        if (player.yspeed < 50 && rainbow.parent) {
            rainbow.parent.removeChild(rainbow);
        }
    };

    drawScores = function (player) {
        var scoreBoard = {};

        if (scoreChanged) {
            scoreBoard = {};
            scoreBoard.omg = player.position.y - 490 - langoliers.position.y;
            scoreBoard.score = player.score;
            scoreBoard.name = player.name;
            scoreBoard.avatar = player.avatar;
            scoreBoard.current = true;

            if (scoresAddedBefore) {

                $player.find('> div').each(function () {
                    $(this).find('h3 span').text(scoreBoard.score);
                    $(this).find('p.omg').html('Langoliers in: <br/>' + Math.round(-100 * scoreBoard.omg / (goingUp * 60)) / 100);
                });
            } else {
                scoresAddedBefore = true;
                $player.empty();

                var $scoreItem = $(document.createElement('div')),
                    $scoreItemPlayer = $(document.createElement('h3')),
                    $scoreItemPoint = $(document.createElement('span')),
                    $scoreItemAvatar = $(document.createElement('img')),
                    $scoreOMG = $(document.createElement('p'));

                $scoreOMG.text('');
                $scoreOMG.addClass('omg');
                $scoreItemPoint.text(scoreBoard.score);
                $scoreItemPlayer.text(scoreBoard.name + ': ').append($scoreItemPoint);
                $scoreItemAvatar.attr('src', 'img/avatars/' + scoreBoard.avatar + '.png');
                $scoreItem.append($scoreItemPlayer);
                $scoreItem.append($scoreItemAvatar);
                $scoreItem.append($scoreOMG);

                $scoreItem.attr('data-id', scoreBoard.omg);

                $scoreItem.addClass('current');

                scoreChanged = false;
                $player.append($scoreItem);

            }
        }
    };

    animate = function () {

		window.meter.tickStart();
        requestAnimationFrame(animate);
        frameCounter += 1;

        var player = module.publish('purrfect.cache.get', 'gamePlayer'),
            scores = [];

        scores.push(player.score);
        renderRainbow(player);
        powerupCollide(player);

        if (player.movingLeft) {
            player.xspeed -= 0.4;
        } else if (player.movingRight) {
            player.xspeed += 0.4;
        } else {
            if (player.xspeed > 0) {
                player.xspeed -= 0.9;
            } else if (player.xspeed < 0) {
                player.xspeed += 0.9;
            }
            if (Math.abs(player.xspeed) < 1 && player.xspeed !== 0) {
                player.xspeed = 0;
            }
        }

        // speed limits
        if (player.xspeed > maxSpeed) {
            player.xspeed = maxSpeed;
        }
        if (player.xspeed < -maxSpeed) {
            player.xspeed = -maxSpeed;
        }

        if (player.yspeed >= 0 && !player.lockJump && player.jumping && !gameFinished && counter < 10 || player.position.y === 580 && player.jumping) {
            resetTimeout();
            jumpBoost = (player.xspeed === 0 ? 1 : Math.abs(player.xspeed / 20));
            if (jumpBoost < 1) {
                jumpBoost = 1;
            }
            player.yspeed += 6 * jumpBoost;
            counter += 1;

            if (counter === 10) {
                player.lockJump = true;
            }
        }

        // responding to boundaries
        if (player.position.x <= 20) {
            player.xspeed *= (-1);
            player.position.x = 21;
            maxSpeed += 1;
        }
        if (player.position.x >= 770) {
            player.xspeed *= (-1);
            player.position.x = 769;
            maxSpeed += 1;

        }
        if (!gameFinished) {
            goingUp += 0.015;
        }

        if (goingUp > 20) {
            goingUp = 20;
        }

        langoliers.position.y -= goingUp;
        container.position.y = -player.position.y + 300;

        if (langoliers.position.y < player.position.y - 490) {
            //we die here :P
            module.publish('purrfect.view.result', player.score);
            gameFinished = true;
        }


        // collisions
        if (player.position.y > 580) {
            player.yspeed = 0;
            player.position.y = 580;
        } else if (player.position.y !== 580 && player.onGround === false) {
            player.yspeed -= 2;
        }

        if (player.onGround) {
            player.yspeed = 0;
            player.position.y = player.ground;
        }

        player.position.x += player.xspeed;
        player.position.y -= player.yspeed;

        collide(player);
        player.nameTag.position.x = player.position.x;
        player.nameTag.position.y = player.position.y - 120;


        if (!gameFinished) {
            drawScores(player);
        }

        if (container.position.y < 0) {
            container.position.y = 0;
            player.state.setAnimationByName('idle', true);
        }

        renderer.render(stage);
		window.meter.tick();
    };

    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.loop'), requestAnimationFrame, jQuery));