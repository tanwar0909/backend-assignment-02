const express = require('express');
const router = express.Router();
const students = require('../data/students');

router.get('/', (req, res) => {
  res.status(200).json(students);
});

router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.status(200).json(student);
});

router.post('/', (req, res) => {
  const { name, age, course } = req.body;

  if (!name || age === undefined || age === null || !course || typeof name !== 'string' || isNaN(Number(age)) || typeof course !== 'string') {
    return res.status(400).json({ error: 'Invalid input. Name (string), age (number), and course (string) are required.' });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    age: Number(age),
    course: course.trim()
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const { name, age, course } = req.body;

  if (!name || age === undefined || age === null || !course || typeof name !== 'string' || isNaN(Number(age)) || typeof course !== 'string') {
    return res.status(400).json({ error: 'Invalid input. Name (string), age (number), and course (string) are required.' });
  }

  students[studentIndex] = {
    id: studentId,
    name: name.trim(),
    age: Number(age),
    course: course.trim()
  };

  res.status(200).json(students[studentIndex]);
});

router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent
  });
});

module.exports = router;
