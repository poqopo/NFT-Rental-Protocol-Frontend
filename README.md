node_modules/react-scripts/config/webpack.config.js

resolve: {
    ...
    fallback: {
      fs: false,
      net: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      url : require.resolve('url'),
    },
    ...
}

추가 후  npm install로 dependency 설치

후에 npm run start실행