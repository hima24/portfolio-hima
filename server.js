require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
// Disable caching so robot always shows on reload
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  next();
});
app.use(express.static('public'));
app.use('/api/chat', require('./api/chat'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});