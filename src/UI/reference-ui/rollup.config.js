// Configuration for bundling the ReferenceUI and derivatives
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import svgo from 'rollup-plugin-svgo'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'
import ignore from 'rollup-plugin-ignore'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/referenceUIMachineOptions.js',
  output: [
    { file: 'dist/referenceUIMachineOptions.js', format: 'es' },
    {
      file: 'dist/referenceUIMachineOptions.min.js',
      format: 'es',
      plugins: [terser()],
    },
  ],
  plugins: [
    // ignore crypto module
    ignore(['crypto']),
    commonjs({
      transformMixedEsModules: true,
    }),
    typescript(),
    babel({
      include: ['src/**'],
      extensions: ['.js'],
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    svgo({ raw: true }),
    postcss({
      modules: true,
      plugins: [autoprefixer],
    }),
    nodeResolve({
      preferBuiltins: false,
      browser: true,
    }),
  ],
}
