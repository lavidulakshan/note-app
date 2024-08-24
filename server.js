const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lakshan@1999',
  database: 'note_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.post('/login', (req, res) => {
  console.log('Received request body:', req.body); // Log the entire request body

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  console.log('Received username:', username);
  console.log('Received password:', password);

  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
