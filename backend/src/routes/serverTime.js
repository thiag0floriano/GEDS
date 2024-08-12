const express = require('express');
const router = express.Router();

router.get('/server-time', (req, res) => {
  const serverTime = new Date().toISOString();
  res.send({ serverTime });
});

module.exports = router;
