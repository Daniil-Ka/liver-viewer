// Configuration for bundling the ReferenceUI and derivatives
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import svgo from 'rollup-plugin-svgo'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import ignore from 'rollup-plugin-ignore'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'test/testUINoPlaneSliders.js',
  output: { file: 'test/testUINoPlaneSlidersBundle.js', format: 'es' },
  plugins: [
    typescript({
      tsconfig: 'src/UI/reference-ui/tsconfig.json',
      compilerOptions: {
        declaration: false,
        declarationMap: false,
      },
    }),
    // ignore crypto module
    ignore(['crypto']),
    commonjs({
      transformMixedEsModules: true,
    }),
    babel({
      include: ['src/UI/reference-ui/src/**', 'test/testUINoPlaneSliders.js'],
      extensions: ['.js'],
      exclude: 'node_modules/**',
      skipPreflightCheck: true,
      babelHelpers: 'bundle',
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
