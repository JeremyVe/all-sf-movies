const defaults = require('./default');
const config = require(`./${process.env.NODE_ENV || 'development'}.js`);

// merge default and config
const configs  = Object.assign({}, defaults, config);
module.exports = configs;
