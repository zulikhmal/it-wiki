const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Import or move your existing Express routes/markdown logic here...

module.exports.handler = serverless(app);