requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

requirejs([
    './lucas'
], function() {
    $.ready(function() {
        var data = [
            {
                id: 1,
                title: 'Do the dishes'
            },
            {
                id: 2,
                title: 'Take out the trash'
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ];

        var app = $.query('#todo-app'),
            app_add_elem = null,
            app_items_elem = null;

        $.on(app, {
            create: function(e) {
                var html = '<input placeholder="Add a todo">',
                    todo = {};

                html += '<ul class="todo-items">';
                for (var i = 0; i < data.length; i++) {
                    todo = data[i];
                    html += '<li>' + todo.title + '<button type="button">X</button>' + '</li>';
                }
                html += '</ul>'
                $.html(app, html);

                app_add_elem = $.query('input', app);
                $.on(app_add_elem, 'keyup', function(e) {
                    if (e.keyCode && e.keyCode === 13) {
                        $.trigger(app, 'add');
                    }
                });

                app_items_elem = $.query('ul', app);
                $.on(app_items_elem, 'click', function(e) {
                    if (e.target.nodeName === 'BUTTON') {
                        $.trigger(app, 'del', [e]);
                    }
                });
            },
            add: function(e) {
                var html = '';

                html = $.html(app_items_elem);
                html += '<li>' + app_add_elem.value + '<button type="button">X</button></li>'
                $.html(app_items_elem, html);
                app_add_elem.value = '';
            },
            del: function(e) {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            }
        });
        $.trigger(app, 'create');
    });
});
