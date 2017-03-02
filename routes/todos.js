var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://justin:justin@ds161169.mlab.com:61169/a2todos',['todos']);

//get all todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err,todos){
        if(err){
            res.send(err);
        } else {
            res.send(todos);
        }
    });
});

//get single todo
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,todos){
        if(err){
            res.send(err);
        } else {
            res.send(todo);
        }
    });
});


//save todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//edit todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};

    console.log('server hit', todo)

    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text) {

        updObj.text = todo.text;
        console.log(updObj);
    }

    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        console.log(mongojs.ObjectId(req.params.id));
        db.todos.update({_id: mongojs.ObjectId(req.params.id)}, updObj, function(err, result){
            if(err){
                console.log(err)
                res.send(err);
                
            } else {
                console.log(result);
                res.json(result);
                
            }
        });
    }


});

//delete todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({_id: mongojs.ObjectId(req.params.id)},'', function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
  


});




module.exports = router;
