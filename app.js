const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Student Management REST API',
    endpoints: {
      getAllStudents: 'GET /students',
      getStudentById: 'GET /students/:id',
      createStudent: 'POST /students',
      updateStudent: 'PUT /students/:id',
      deleteStudent: 'DELETE /students/:id'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
