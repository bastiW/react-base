import packageJson from './package.json';

const devDependencies = packageJson.devDependencies
const prodDependencies = packageJson.dependencies
export const dependencies = { ...prodDependencies, ...devDependencies };

export type DependencyName = keyof typeof dependencies;

export const dependency = (name: DependencyName): [string, string] => {
  const version = dependencies[name];

  return [name, version];
};
