var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'https://www.singleledger.org',
  timeout: 9000000000000,
  maxContentLength: 2000,
  headers: { 'X-Custom-Header': 'foobar' }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  var i;
  for (i = 0; i < 500; i++) {
    //console.log(i)
    instance.get('/')
      .then(function (response) {
        // handle success
        console.log("success ");
        //console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("error occured ");
        console.log(error)
      })
      .finally(function () {
        // always executed
      });
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;
