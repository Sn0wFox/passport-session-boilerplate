let express = require('express');

/**
 * A router ! Woow
 * It will be protected by our server.
 */
const router = express.Router();

router.get('/test', (req, res) => {
  return res.status(200).json({
    url: req.originalUrl,
    status: 200,
    comment: 'it works!'
  });
});

module.exports = router;