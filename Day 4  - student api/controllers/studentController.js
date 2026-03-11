// Temporary in-memory "database"
let students = [
  { id: 1, name: 'Alice', grade: 'A' },
  { id: 2, name: 'Bob',   grade: 'B' },
];

// GET /students — Return all students
const getAllStudents = (req, res) => {
  res.status(200).json(students);
};

// POST /students — Add a new student
const createStudent = (req, res) => {
  const { name, grade } = req.body;

  if (!name || !grade) {
    return res.status(400).json({ error: 'Name and grade are required' });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    grade,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

// DELETE /students/:id — Remove a student by ID
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students.splice(index, 1);
  res.status(200).json({ message: `Student ${id} deleted` });
};

module.exports = { getAllStudents, createStudent, deleteStudent };