// server.js
const express = require('express');
const app = express();
const gateway = require('./gateway');

app.use(gateway);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API Gateway server listening on port ${port}`);
});
