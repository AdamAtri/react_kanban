// Chooses the Provider to use based on the environment
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Provider.prod');
}
else {
  module.exports = require('./Provider.dev');
}
