const express = require('express');
const router = express.Router();

const { retrieveAll } = require('../controllers/olympic_winners')

router.get('/api', retrieveAll);

module.exports = router;