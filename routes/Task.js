const express = require('express');
const router = express.Router();
const taskModel = require('../model/Task.js');

router.get('/', async (req, res, next) => {

  try {
    let tasks = await taskModel.find({}).sort({'_id':-1}).exec();
   return  res.status(200).json(tasks);

  } catch (error) {
    //  throw new Error(error);
   return  res.status(400).json({ error: 'something went wrong' });

  }

});


router.get("/:id", async (req,res,next) => {
  try {
    let {id}= req.params;
    let task= await taskModel.findById(id);
    if (task) {
     return  res.status(200).json( task);
    } else {
     return  res.status(400).json({ error: 'something went wrong' });
    }
  } catch (error) {
   return  res.status(400).json({ error: 'something went wrong' });
  }
});

router.post('/newtask', (req, res, next) => {
  try {

    let { title,isCompleted } = req.body;
    let newtask = new taskModel({
      title,
      isCompleted
    });
    if (newtask.save()) {

     return  res.status(201).json({ msg: "task created" });

    } else {
     return  res.status(400).json({ error: 'task not created' });

    }
  } catch (error) {
   return  res.status(400).json({ error: 'something went wrong' });
  }
});

router.put("/:id", (req, res, next) => {
  try {
    let {title,isCompleted}=  req.body;
    let { id } = req.params;
    taskModel.findByIdAndUpdate({ _id: id }, {
      title,
      isCompleted
    }, (err, doc) => {
      if (err) {
       return  res.status(400).json({ error: err });

      } else {
       return  res.status(200).json('Changes saved' );

      }
    });
  } catch (error) {
   return  res.status(400).json({ error: 'something went wrong' });
  }

});


router.delete("/:id", (req, res, next) => {

  try {
    let { id } = req.params;
    taskModel.findByIdAndDelete({ _id: id }, (err, doc) => {
      if (err) {
       return  res.status(400).json({ error: doc });

      } else {
       return  res.status(200).json({status:true, msg:'post deleted'} );

      }
    });
  } catch (error) {
   return  res.status(400).json({ error: 'something went wrong' });
  }

});




module.exports = router;
