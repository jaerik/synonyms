'use strict';

const basicAuth = require('express-basic-auth');
const express = require('express');
const fs = require("fs");
const https = require('https');
const mysql = require('mysql2');
const path = require('path');

const PORT = process.env.EXPRESS_PORT;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE
});

db.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("db connected");
});

const app = express();

app.use(basicAuth({
  users: { 'erikja': 'abcd' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}));

const httpsServer = https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
}, app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

httpsServer.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

app.get("/api/get-words", (req, res) => {
  let query = `SELECT *
               FROM word`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/api/add-word/:word", (req, res) => {
  let query = `INSERT INTO word (chars)
               VALUES ('${req.params.word}')`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    console.log("results:" + JSON.stringify(results));
    res.send({'id': results.insertId});
  });
});

app.get("/api/get-word/:word", (req, res) => {
  let query = `SELECT w.id
               FROM word w
               WHERE w.chars = '${req.params.word}'`
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/api/add-synonym/:word1/:word2", (req, res) => {
  let query = `INSERT INTO synonym (word_id1, word_id2)
               SELECT w1.id, w2.id
               FROM word w1, word w2
               WHERE w1.chars = '${req.params.word1}' AND w2.chars = '${req.params.word2}'`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.send({'id': results.insertId});
  });
});

app.get("/api/get-synonyms/:word", (req, res) => {
  console.log(req.params.word);
  let query = `WITH RECURSIVE syn_rec(w_id1, w_id2, level) AS (
                 SELECT word_id2, word_id1, 1
                 FROM synonym
                 WHERE word_id2 = (SELECT id FROM word WHERE chars = '${req.params.word}')
                 UNION ALL
                 SELECT word_id1, word_id2, 1
                 FROM synonym
                 WHERE word_id1 = (SELECT id FROM word WHERE chars = '${req.params.word}')
                 UNION ALL
                 SELECT s.word_id2, s.word_id1, r.level + 1
                 FROM syn_rec r
                 JOIN synonym s
                 ON r.w_id2 = s.word_id2 AND NOT r.w_id1 = s.word_id1 AND NOT r.w_id1 = '${req.params.word}'
                 WHERE r.level < 10
                 UNION ALL
                 SELECT s.word_id1, s.word_id2, r.level + 1
                 FROM syn_rec r
                 JOIN synonym s
                 ON r.w_id2 = s.word_id1 AND NOT r.w_id1 = s.word_id2 AND NOT r.w_id1 = '${req.params.word}'
                 WHERE r.level < 10
               )
               SELECT word.chars
               FROM syn_rec
               JOIN word
               ON syn_rec.w_id2 = word.id`;
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});
