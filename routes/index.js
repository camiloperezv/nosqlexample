var express = require('express');
var router = express.Router();
var names = ['Camilo','Pedro','Juan','Maria','Juliana'];
var lastnames = ['Perez','Velez','Montoya','Mora','Correa'];
const UserModel = require('mongoose').model('User');
var makePass = function() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user',function(req,res){
  let user = {
    name:`${names[Math.floor(Math.random()*4)]} ${lastnames[Math.floor(Math.random()*4)]}`,
    phone:Math.floor(Math.random()*40000000),
    age:Math.floor(Math.random()*80),
    password:makePass()
  }
  user.email = `${user.name.split(' ').join('_')}@email.com`;
  user = new UserModel(user);
  user.save()
  res.end('ok')
})
router.get('/user',function(req,res){
  UserModel.find({},function(err,docs){
    if(!err) return res.json(docs);
    return res.json(err)
  })
})
let fun = "(function(){var date = new Date(); do{curDate = new Date();}while(curDate-date<10000); return Math.max();})()"
router.post('/login',function(req,res){
  let user = req.body.user;
  console.log('inject?',user);
  UserModel.findOne({email:user.email,password:user.password},function(err,dbUsr){
    console.log('err',err)
    console.log('user',dbUsr)
    if(err || !dbUsr) return res.json({error:err})
    return res.json({ok:dbUsr})
  });
});
router.post('/age',function(req,res){
  var ageBody = req.body.age;
  console.log('inject?',ageBody);
  UserModel.find({$where: function(){return this.age > ageBody;}},function(err,dbUsr){
    console.log('err',err)
    console.log('user',dbUsr)
    if(err || !dbUsr) return res.json({error:err})
    return res.json({ok:dbUsr})
  });

})
module.exports = router;
                    