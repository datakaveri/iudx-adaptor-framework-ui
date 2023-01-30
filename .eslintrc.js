module.exports = {
  extends: ['airbnb', 'plugin:react-hooks/recommended', 'prettier'],
  parser: '@babel/eslint-parser',

  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },

  plugins: ['react'],

  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
  },

  rules: {
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [0, {}],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['id'],
        },
      },
    ],
    'max-len': [
      'error',
      { code: 220, ignoreRegExpLiterals: true, tabWidth: 2 },
    ],
    'no-console': [0],
    'react/jsx-props-no-spreading': 0,
    'linebreak-style': 'off',
    'react/jsx-one-expression-per-line': [0, { allow: 'literal' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-fragments': ['off', 'element'],
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'warn',
    'object-curly-newline': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/function-component-definition': 'off',
    'react/destructuring-assignment': 'off',
  },
};
