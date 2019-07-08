const express = require ('express');
const router = express.Router();

// Model
const {School} = require('../../db/models');

// Routes
router.route('/:id?')
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;
      if(id){
        const school = await School.findByPk(id);
        res.send(school);
      } else {
        res.send(await School.findAll());
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;