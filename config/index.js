var defaults = require('./default');
var config = require(`./${process.env.NODE_ENV || 'development'}.js`);

// merge default and config
var configs  = Object.assign({}, defaults, config);
module.exports = configs;
