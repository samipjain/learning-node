var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NODE World', title1: 'Checking Title' });
});

router.post('/learningnode/createuser', function(req, res, next){
  try{
    var reqObj = req.body;
    console.log(reqObj);
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        var insertSql = "INSERT INTO user_master SET ?";
        var insertValues = {
          "user_name": reqObj.username,
          "password": reqObj.password
        };
        var query = conn.query(insertSql, insertValues, function(err, result){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          console.log(result);
          var user_id = result.insertId;
          res.json({"User ID": user_id});
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/learningnode/getuserlist', function(req, res, next){
  try{
    var query = url.parse(req.url, true).query;        
    console.log(query);
    var userId = query.userId;
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select * from user_master where user_id = ?', [userId], function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

router.get('/learningnode/getalluserlist', function(req, res, next){
  try{    
    req.getConnection(function(err, conn){
      if (err)
      {
        console.error('SQL Connection error: ',err);
        return next(err);
      }
      else
      {
        conn.query('select * from user_master', function(err, rows, fields){
          if(err){
            console.error('SQL Error: ', err);
            return next(err);            
          }
          var resEmp = [];
          for (var userIndex in rows){
            var userObj = rows[userIndex];
            resEmp.push(userObj);
          }
          res.json(resEmp);
        });
      }
    });
  }
  catch(ex){
    console.error("Internal error: "+ex);
    return next(ex);
  }
});

module.exports = router;
