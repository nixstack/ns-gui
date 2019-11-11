  "scripts": {
    "start:render": "node scripts/render.start.js",
    "prestart:main": "tsc --build src/main/tsconfig.json",
    "start:main": "electron src/main/index.js",
    "build": "node scripts/render.build.js",
    "test": "node scripts/render.test.js"
  },

  npx cross-env TS_NODE_PROJECT=src/server/tsconfig.json node -r ts-node/register .\src\server\index.ts


# 安装mongodb
1. yarn global add windows-build-tools
2. yarn global add run-rs
