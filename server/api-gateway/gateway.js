// gateway.js
const layer0 = require('@layer0/core/router');
const carsRouter = require('./routes/cars');

layer0.use(carsRouter);

module.exports = layer0;
