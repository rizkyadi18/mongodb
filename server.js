const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolist').then(() => console.log('Connected!'));

// Definisikan skema untuk tugas
const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean
});

const Todo = mongoose.model('todo', todoSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));

// Tampilkan halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint: Ambil semua tugas
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// API endpoint: Tambah tugas baru
app.post('/api/todos', async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task, completed: false });
  await newTodo.save();
  res.json(task);
});

// API endpoint: Hapus tugas
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.send('Task deleted successfully');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
