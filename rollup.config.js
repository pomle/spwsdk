import resolve from 'rollup-plugin-node-resolve';
//import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
//import uglify from 'rollup-plugin-uglify';

const BABEL_CONF = {
  babelrc: false,
  presets: [
    [
      "env",
      {"modules": false}
    ]
  ],
  plugins: [
    'external-helpers',
  ]
};

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: `dist/index.js`,
                format: 'cjs'
            },
        ],
        plugins: [
            resolve(),
            babel(BABEL_CONF),
        ]
    }
];
