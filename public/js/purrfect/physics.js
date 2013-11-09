/*global _li */

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        gravity,
        left,
        right,
        down,
        up;

    gravity = function (object) {
        if (object) {
            object.position.y = object.position.y - 3.5 * object.bounciness + 4.5 * object.fallingVelocity;
            if (object.position.y > object.ground) {
                object.position.y = object.ground;
                object.fallingVelocity = 0;
                object.bounciness -= 1;
                if (object.bounciness < 0.5) {
                    object.bounciness = 0.01;
                }

            } else {
                object.fallingVelocity += 0.12;
            }
        }
    };

    left = function (object) {
        if (object) {
            object.targetPosition.x = object.position.x - 1000;
        }

    };

    right = function (object) {
        if (object) {
            object.targetPosition.x = object.position.x + 1000;
        }

    };

    down = function (object) {
        if (object) {
            object.bounciness = 2;
            object.targetPosition.y = object.position.y + 1000;
        }

    };

    up = function (object) {
        if (object) {
            object.bounciness = 4;
            object.targetPosition.y = object.position.y - 1000;
        }

    };

    module.subscribe(moduleName + '.gravity', 'object', gravity);
    module.subscribe(moduleName + '.left', 'object', left);
    module.subscribe(moduleName + '.right', 'object', right);
    module.subscribe(moduleName + '.down', 'object', down);
    module.subscribe(moduleName + '.up', 'object', up);

}(_li.define('purrfect.physics')));