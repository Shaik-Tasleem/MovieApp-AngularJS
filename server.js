const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const { log } = require('console');

const app = express();
const port = 3000;

// File path to the database
const dbFilePath = path.join(__dirname, 'db.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve AngularJS files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the AngularJS app (index.html should be in the 'public' folder)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to read from the database
const readDB = () => {
  return fs.readJson(dbFilePath);
};

// Helper function to write to the database
const writeDB = (data) => {
  return fs.writeJson(dbFilePath, data);
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { id, email, pass } = req.body;
    if (!id || !email || !pass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let db = await readDB();
    if (db.users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    db.users.push({ id, email, pass });
    await writeDB(db);

    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign In endpoint
// Sign In endpoint
app.post('/api/signin', async (req, res) => {
  try {
    const { email, pass } = req.body;
    console.log(email,pass);
    
    console.log('Sign In Request:', req.body); // Log the request data

    if (!email || !pass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let db = await readDB();
    console.log('Database Users:', db.users); // Log the database content

    const user = db.users.find(user => user.email === email && user.pass === pass);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Sign in successful' });
  } catch (err) {
    console.error('Server Error:', err); // Log server errors
    res.status(500).json({ message: 'Server error' });
  }
});

// ... (existing server.js content)

// Serve the AngularJS app (index.html should be in the 'public' folder)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Sign In endpoint
// app.post('/api/signin', async (req, res) => {
//   try {
//     const { email, pass } = req.body;
//     console.log(email,pass);
    
//     console.log('Sign In Request:', req.body); // Log the request data

//     if (!email || !pass) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     let db = await readDB();
//     console.log('Database Users:', db.users); // Log the database content

//     const user = db.users.find(user => user.email === email && user.pass === pass);
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Sign in successful' });
//   } catch (err) {
//     console.error('Server Error:', err); // Log server errors
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.listen(port, () => {
  // console.log('Server running on' http://localhost:${port}');
});


// app.listen(port, () => {
//   console.log(Server running on http://localhost:${port});
// });