const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/', (req, res) => {});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

module.exports = router;
