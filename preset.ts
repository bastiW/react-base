import { Preset } from 'apply';
import { dependency, DependencyName } from './depdendencies';

// This would be easier to move to a template. I used a function just to test how the editing of existing files works.
function addLegacy() {
  Preset.editNodePackages().add('@vitejs/plugin-legacy', '^1.6.2');
  Preset.edit(['vite.config.ts'])
    .addAfter("import react from '@vitejs/plugin-react'", "import legacy from '@vitejs/plugin-legacy';")
    .withIndent('double');

  Preset.edit(['vite.config.ts']).update(content => {
    const searchString = 'react()';
    const newPlugin = `
               ${searchString},
              // https://www.npmjs.com/package/@vitejs/plugin-legacy
              legacy({
                targets: ['defaults', 'not IE 11'],
              }),
            `;
    return content.replace(searchString, newPlugin);
  });
}

function addPackage(name: DependencyName) {
  return Preset.editNodePackages().add(...dependency(name));
}

function addDevPackage(name: DependencyName) {
  return Preset.editNodePackages().add(...dependency(name));
}

function addI18next() {
  addPackage('i18next');
  addPackage('i18next-browser-languagedetector');

  addPackage('i18next-http-backend')
  addPackage('react-i18next');

  Preset.edit(['public/locales/de/translation.json', 'public/locales/en/translation.json']).replaceVariables(({ prompts }) => ({
    projectName: prompts.projectName,
  }));
}

function addLintAndPrettier() {
    addDevPackage('@typescript-eslint/eslint-plugin')
    addDevPackage('@typescript-eslint/parser')
    addDevPackage('eslint')
    addDevPackage('eslint-config-prettier')
    addDevPackage('eslint-plugin-prettier')
    addDevPackage('eslint-plugin-jsx-a11y')
    addDevPackage('eslint-plugin-react')
    addDevPackage('eslint-config-prettier')
    addDevPackage('eslint-plugin-prettier')
    addDevPackage('prettier')
  Preset.editJson('package.json').merge({
    scripts: {
      lint: 'eslint . --ext .js,.jsx,.ts,.tsx --quiet',
      'lint:fix': 'eslint . --ext .js,.jsx,.ts,.tsx --fix',
      pretty: 'yarn prettier --write .',
      'pretty:ci': 'yarn prettier --check .',
      formatcode: 'yarn run lint:fix && yarn run pretty',
      'checkcode:ci': 'yarn run lint && yarn run pretty:ci',
    },
  });
}

function addFormatOnCommit() {
  addDevPackage('husky')
  addDevPackage('lint-staged')

  Preset.editJson('package.json').merge({
    scripts: {
      prepare: 'husky install',
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
  });
}

function addBasicRouter() {
  addPackage('react-router-dom')
}

function runFormatCode() {
  Preset.execute('yarn', 'formatcode');
}

function addTesting() {
  Preset.editNodePackages()
    addDevPackage('@babel/core')
    addDevPackage('@testing-library/dom')
    addDevPackage('@testing-library/jest-dom')
    addDevPackage('@testing-library/react')
    addDevPackage('@testing-library/user-event')
    addDevPackage('babel-jest')
    addDevPackage('jest')
    addDevPackage('jest-transform-stub')
    addDevPackage('jest-watch-typeahead')
    addDevPackage('eslint-plugin-jest')
    addDevPackage('babel-preset-react-app')

  Preset.editJson('package.json').merge({
    jest: {
      roots: ['<rootDir>/src'],
      setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
      collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
      testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      },
      transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
      moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
      },
      watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
      resetMocks: true,
    },
  });

  Preset.editJson('package.json').merge({
    scripts: {
      test: 'yarn run jest --watch -env=jsdom',
      'test:ci': 'yarn run jest --ci -env=jsdom',
    },
  });

  Preset.editJson('package.json').merge({
    babel: {
      env: {
        test: {
          presets: ['react-app'],
        },
      },
    },
  });
}

Preset.setName('react-base');
// TODO Type this better
Preset.prompt().add('projectName', {
  type: 'input',
  name: 'projectName',
  message: 'What is the project display name?',
  initial: 'Awesome DCX Project',
});

Preset.extract().withDots();
addI18next();
addLegacy();
addLintAndPrettier();
addFormatOnCommit();
addTesting();
addBasicRouter();
Preset.installDependencies();
runFormatCode();
