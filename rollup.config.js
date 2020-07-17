import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js'];

const config = {
  external: ['xmlbuilder', 'fs', 'path', 'dateformat', 'mkdirp', 'strip-ansi'],
  input: 'src/index.js',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [
    resolve({
      extensions,
      jsnext: true,
    }),
    babel({
      extensions,
    }),
    terser(),
  ],
};

export default config;
