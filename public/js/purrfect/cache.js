/*global _li*/

(function (module) {
    'use strict';

    var moduleName = module.get('name'),
        getItem,
        setItem;

    getItem = function (key) {
        return module.get(key);
    };

    setItem = function (data) {
        module.set(data.key, data.value);
    };

    module.subscribe(moduleName + '.get', false, getItem);
    module.subscribe(moduleName + '.set', false, setItem);

}(_li.define('purrfect.cache')));