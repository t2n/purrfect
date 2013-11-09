/*global _li, io, location*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        socket = null,
        force = 50,
        gravity,
        left,
        right,
        down,
        up;

    gravity = function (object) {
        object.position.y = object.position.y - 3 * object.bounciness + 3.2 * object.fallingVelocity;

        if (object.position.y > 580) {
            object.position.y = 580;
            object.fallingVelocity = 0;
            object.bounciness -= 1;

        } else {
            object.fallingVelocity += 0.1;
        }
    };

    left = function (object) {
        object.targetPosition.x = object.position.x - 1000;

    };

    right = function (object) {
        object.targetPosition.x = object.position.x + 1000;

    };

    down = function (object) {
        object.bounciness = 2;

        object.targetPosition.y = object.position.y + 1000;

    };

    up = function (object) {
        object.bounciness = 4;


        object.targetPosition.y = object.position.y - 1000;

    };

    module.subscribe(moduleName + '.gravity', 'object', gravity);
    module.subscribe(moduleName + '.left', 'object', left);
    module.subscribe(moduleName + '.right', 'object', right);
    module.subscribe(moduleName + '.down', 'object', down);
    module.subscribe(moduleName + '.up', 'object', up);

}(_li.define('purrfect.physics')));