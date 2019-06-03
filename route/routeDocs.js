var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/hi', function(req, res) {
  axios.post('http://192.168.1.55:3001', {
    servidor: 'servidor 1 ok'
  }
).then(response => {
        res.render('index', { title: 'Express' });
      })
      .catch(error => {
        res.render('index', { title: 'Error' });
      });
});

router.post('/hi', function(req, res) {
  console.log(req);
  res.send("ok1");
});
module.exports = router;
