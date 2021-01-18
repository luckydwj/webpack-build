const path = require('path');

module.exports =(env)=> {
    //
    console.log('NODE_ENV: ', env.NODE_ENV);
    console.log('Production: ', env.production)
  return {
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'demo-numbers.js',
          library: 'demoNumbers',
          libraryTarget: 'umd',
      },
      externals: {
          lodash: {
              commonjs: 'lodash',
              commonjs2: 'lodash',
              amd: 'lodash',
              root: '_',
          },
      },
  }
};

