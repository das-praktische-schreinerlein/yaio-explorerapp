(function () {
    'use strict';

    module.exports = {
        devserver: {
            port: '<%= devserverPort %>',
            root: './build/',
            // proxy rest-calls to restServer
            proxy: '<%= devserverRest %>',
            // override build/yaio-explorerapp/yaio-explorerapp.html with the patched version from /devserver
            customPages: {
                '/yaio-explorerapp/yaio-explorerapp.html': '../devserver/yaio-explorerapp/yaio-explorerapp.html'
            }
        }
    };
})();

