module.exports = {
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    rules: [
      {test: /\.cjs.js$/, loader: 'file-loader'}
    ]
  },
};