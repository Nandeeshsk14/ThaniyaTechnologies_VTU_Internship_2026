const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  createStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.get('/',    getAllStudents);  // GET    /students
router.post('/',   createStudent);  // POST   /students
router.delete('/:id', deleteStudent); // DELETE /students/:id

module.exports = router;