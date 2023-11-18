// wdio.conf.js
exports.config = {
    runner: 'local',
    specs: [
        './path/to/your/test/file.js'
    ],
    capabilities: [{
        maxInstances: 1,
        browserName: 'electron'
    }],
    services: ['electron'],
    electronOpts: {
        args: ['path/to/your/app']
    }
};
