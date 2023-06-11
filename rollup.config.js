/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from 'rollup-plugin-auto-external';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [autoExternal(), commonjs()],
  output: [
    {file: 'lib/index.js', format: 'esm', sourcemap: true}
  ]
};
