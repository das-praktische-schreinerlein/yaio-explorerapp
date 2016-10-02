(function () {
    'use strict';

    module.exports = {
        options: {
            configFile: 'karma.yaio.conf.js',
            noColor: false
        },
        // testmodus: unit only
        unit: {
            singleRun: true
        },
        coverage: {
            singleRun: true,
            configFile: 'karma.coverage.yaio.conf.js'
        },
        // testmodus: continous
        continuous: {
            // keep karma running in the background
            background: true
        }
    };
})();