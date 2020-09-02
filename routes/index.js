var express = require('express');
var router = express.Router();
const axios = require('axios').default;
const mysql = require('mysql');
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

router.get('/mysql', function (req, res, next) {
  var i;

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pankajcheema',
    database: 'paypie_service'
  });
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
  console.log(connection)


  res.render('index', { title: 'Express mysql' });
});
router.get('/mysql2', function (req, res, next) {
  var i;

  // var connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: 'pankajcheema',
  //   database: 'paypie_service'
  // });
  // connection.connect(function (err) {
  //   if (err) {
  //     console.error('error connecting: ' + err.stack);
  //     return;
  //   }

  //   console.log('connected as id ' + connection.threadId);
  // });

  var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'pankajcheema',
    database: 'paypie_service'
  });
  pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  pool.getConnection(function (err, connection) {
    console.log("this is connection ")
    //console.log(connection)
    connection.beginTransaction();
    connection.query('delete from businesses where id="f479a54e-246e-4197-a7a3-12e7d44df1ae"', function (error, results, fields) {
      if (error) throw error;
      console.log('first query executed');
    });
    connection.query('delete from business where id="f735bc3e-da1e-493a-8723-cb1588e849a2"', function (error, results, fields) {
      if (error) {
        connection.rollback()
        console.log("comes to error")
        return;
      }
      connection.commit();
      console.log('second query executed');
    });

    console.log("all success")

  })


  //console.log(connection)


  res.render('index', { title: 'Express mysql' });
});

module.exports = router;
