const express = require('express');
const router = express.Router();

// Model
const {Student} = require('../../db/models');

// Routes
router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.id);
      res.send(student);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedStudent = await Student.putItUp(req.params.id, req.body);
      res.send(updatedStudent);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Student.remove(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

router.route('/')
  .get(async (req, res, next) => {
    try {
      res.send(await Student.findAll());
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newStudent = await Student.create(req.body, {fields: ['firstName', 'lastName', 'email', 'gpa', 'schoolId', 'imageUrl']});
      res.send(newStudent);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;