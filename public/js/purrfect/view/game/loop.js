/*global _li, PIXI, requestAnimationFrame*/

(function (module, requestAnimationFrame) {
    'use strict';

    var moduleName = module.get('name'),
        stage = null,
        renderer = null,
        animate,
        init;

    init = function () {
        stage = module.publish('purrfect.cache.get', 'gameStage').cached;
        renderer = module.publish('purrfect.cache.get', 'gameRenderer').cached;

        requestAnimationFrame(animate);
    };

    animate = function () {
        requestAnimationFrame(animate);
        var players = module.publish('purrfect.cache.get', 'gamePlayers').cached;

        for (var player in players) {
            if (players.hasOwnProperty(player)) {
                module.publish('purrfect.physics.gravity', players[player]);
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
                    if (players[player].keyPressed[38]) {
                        players[player].position.y -= players[player].speedup + 0.5 * players[player].velocity + 1.5 * players[player].speedup;
                    }
                }
                if (players[player].targetPosition.y > players[player].position.y) {
                    if (players[player].keyPressed[40]) {
                        players[player].position.y += 8 + 0.5 * players[player].velocity;
                    }
                }

            }
        }

        renderer.render(stage);
    };


    module.subscribe(moduleName, 'main', init);

}(_li.define('purrfect.view.game.loop'), requestAnimationFrame));