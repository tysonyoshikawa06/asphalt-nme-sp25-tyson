import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello from the Green Club backend!');
});

// Serve the frontend on any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
