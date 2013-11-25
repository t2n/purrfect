/*global _li, Handlebars, jQuery*/

(function (module, Handlebars, jQuery) {
    'use strict';

    var moduleName = module.get('name'),
        renderTemplate;


    renderTemplate = function (data) {
        var source,
            template;

        jQuery.ajax({
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

    module.subscribe(moduleName + '.renderTemplate', 'main', renderTemplate);

}(_li.define('purrfect.view'), Handlebars, jQuery));