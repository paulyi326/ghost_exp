// # Ghost bootloader
// Orchestrates the loading of Ghost
// When run from command line.

var ghost = require('./core'),
    errors = require('./core/server/errors');

ghost()
.then(function (param) {

    var settings = require('./core/server/api').settings;

    settings
        .read({key: 'activeTheme', context: {internal: true}})
        .then(function (result) {

            try {
                require('./content/themes/' + result.value + '/index')();
            }
            catch (e) {
                //No custom index found, or it wasn't a proper module.
            }

        });
})
.otherwise(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});