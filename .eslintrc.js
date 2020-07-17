module.exports = {
  env: {
    es2020: true,
    jest: true,
  },
  extends: ['airbnb',
  ],
  overrides: [
    {
      env: { jest: true },
      files: ['__test__', '*.spec.jsx', '*.spec.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['.storybook/**', 'stories/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parser: 'babel-eslint',
  plugins: [
    'sort-destructure-keys',
    'sort-keys-fix',
  ],
  rules: {
    'import/extensions': 'off',
    'react/destructuring-assignment': 'off',
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-keys-fix/sort-keys-fix': 2,
  },
};
