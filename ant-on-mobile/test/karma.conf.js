module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'www/js/**/*.js',
      'test/unit/**/*.js'
    ],

    preprocessors : {
      'www/js/**/*.js': ['coverage']
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
            ],

    reporters: ['progress', 'junit', 'coverage'],

    coverageReporter: {
      reporters:[
        {type: 'html', dir:'test_out/'},
        {type: 'text'},
        {type: 'text-summary'}
      ],
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
