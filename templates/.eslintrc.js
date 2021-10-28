module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      arrowFunctions: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jest', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src'],
      },
    },
  },
  rules: {
    // Most rules are based on airbnb eslint, but we don't use airbnb plugin, as is caused formatting issues
    'react/no-children-prop': 'error',
    'react/style-prop-object': 'error',
    'react/no-multi-comp': 'error',
    "prettier/prettier": ["error"],
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    'react/no-will-update-set-state': 'error',
    'react/no-unused-prop-types': 'error',
    "react/sort-comp": ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ["off"],
    '@typescript-eslint/no-explicit-any': ["off"], // change
    'react/no-typos': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
    'react/void-dom-elements-no-children': 'error',
    'react/no-unused-state': 'error',
    'react/boolean-prop-naming': ['off', {
      propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
      rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      message: '',
    }],
    'react/no-typos': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/destructuring-assignment': ['error', 'always'],
    'react/button-has-type': ['error', {
      button: true,
      submit: true,
      reset: false,
    }],
  },
};
