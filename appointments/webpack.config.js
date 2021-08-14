const path = require("path");
const webpack = require("webpack");

module.exports = {
 mode: "development",
 watch: true,
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
     exclude: /node_modules/,
     loader: 'babel-loader'}]}
};
