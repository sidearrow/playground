const functions = require('firebase-functions');
const express = require('express');
const basicAuth = require('basic-auth-connect');

const app = express();

app.use(basicAuth('admin', functions.config().basicPassword));

app.use(express.static(__dirname + '/public/'));

exports.app = functions.region('asia-northeast1').https.onRequest(app)
