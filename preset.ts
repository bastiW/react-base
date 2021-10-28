import { Preset } from 'apply';

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

function addI18next() {
  Preset.editNodePackages()
    .add('i18next', '^20.6.1')
    .add('i18next-browser-languagedetector', '^6.1.2')
    .add('i18next-http-backend', '^1.3.1')
    .add('react-i18next', '^11.12.0');

  Preset.edit(['public/locales/de/translation.json', 'public/locales/en/translation.json']).replaceVariables(({ prompts }) => ({
    projectName: prompts.projectName,
  }));
}

function addLintAndPrettier() {
  Preset.editNodePackages()
    .addDev('@typescript-eslint/eslint-plugin', '')
    .addDev('@typescript-eslint/parser', '^4.31.1')
    .addDev('eslint', '^7.32.0')
    .addDev('eslint-config-prettier', '^8.3.0')
    .addDev('eslint-plugin-prettier', '^4.0.0')
    .addDev('eslint-plugin-jsx-a11y', '^6.4.1')
    .addDev('eslint-plugin-react', '^7.25.3')
    .addDev('eslint-config-prettier', '^8.3.0')
    .addDev('eslint-plugin-prettier', '^4.0.0')
    .addDev('prettier', '^2.4.1');
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
  Preset.editNodePackages().addDev('husky', '^7.0.2').addDev('lint-staged', '^11.1.2');

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
  Preset.editNodePackages().add('react-router-dom', '^5.3.0');
}

function runFormatCode() {
  Preset.execute('yarn', 'formatcode');
}

function addTesting() {
  Preset.editNodePackages()
    .addDev('@babel/core', '^7.15.5')
    .addDev('@testing-library/dom', '^8.10.1')
    .addDev('@testing-library/jest-dom', '^5.14.1')
    .addDev('@testing-library/react', '^12.1.2')
    .addDev('@testing-library/user-event', '^13.5.0')
    .addDev('babel-jest', '^27.2.0')
    .addDev('jest', '^27.2.0')
    .addDev('jest-transform-stub', '^2.0.0')
    .addDev('jest-watch-typeahead', '^0.6.4')
    .addDev('eslint-plugin-jest', '^24.5.2')
    .addDev('babel-preset-react-app', "^10.0.0");


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
