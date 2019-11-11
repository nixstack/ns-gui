const { join } = require('path')
const os = require('os')

module.exports = {
  apps: [
    {
      name: 'server',
      // (function (exports, require, module, __filename, __dirname) { :: Created by npm, please don't edit manually.
      // SyntaxError: Unexpected token :
      // https://github.com/Unitech/pm2/issues/3657
      script: join(
        os.homedir(),
        'AppData/Roaming/npm/node_modules/yarn/bin/yarn.js'
      ),

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      interpreter: 'node_modules/ts-node/dist/bin.js',
      args: 'run start:server',
      instances: 1,
      autorestart: true,
      watch: ['src/server'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        TS_NODE_PROJECT: 'src/server/tsconfig.json'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'main',
      // (function (exports, require, module, __filename, __dirname) { :: Created by npm, please don't edit manually.
      // SyntaxError: Unexpected token :
      // https://github.com/Unitech/pm2/issues/3657
      script: join(
        os.homedir(),
        'AppData/Roaming/npm/node_modules/yarn/bin/yarn.js'
      ),

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      interpreter: 'node_modules/ts-node/dist/bin.js',
      // interpreter_args: '',
      // node_args: '--inspect', // alias to interpreter_args
      args: 'run start:main',
      instances: 1,
      autorestart: true,
      watch: ['src/main'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        TS_NODE_PROJECT: 'src/main/tsconfig.json'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
