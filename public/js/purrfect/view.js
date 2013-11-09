/*global _li, Handlebars*/

(function (module, Handlebars) {
    'use strict';

    var moduleName = module.get('name'),
        cleanup,
        init,
        renderTemplate;

    init = function () {

    };

    cleanup = function () {

    };

    renderTemplate = function (data) {
        var source,
            template;

        $.ajax({
            url: data.path,
            cache: true,
            success: function(response) {
                source    = response;
                template  = Handlebars.compile(source);
                $('#purrfectContainer').html(template);
                if (data.event) {
                    module.publish(data.event);
                }
            }
        });
    };

    module.subscribe(moduleName, 'main', init);
    module.subscribe(moduleName + '.cleanup', 'main', cleanup);
    module.subscribe(moduleName + '.renderTemplate', 'main', renderTemplate);

}(_li.define('purrfect.view'), Handlebars));