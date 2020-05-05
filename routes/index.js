var express = require('express');
var router = express.Router();
const Controller = require("../controllers/form");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*saving form data */
router.post('/save-data', Controller.save);


/* for errors */
router.get('/error', (req, res, next) => {
  res.status(401).render('error',{
    message: "Unauthorized Request",
    error: {status: "NotFoundError: Not Found", stack: ""}
  });
});

module.exports = router;
