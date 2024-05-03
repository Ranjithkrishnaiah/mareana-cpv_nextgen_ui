module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'transform-class-properties',
    'istanbul',
    '@babel/plugin-proposal-optional-chaining',
  ],

  env: {
    test: {
      plugins: [
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-optional-chaining'],
      ],
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
