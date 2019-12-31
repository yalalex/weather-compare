const express = require('');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to Weather Compare' }));

app.get('/api/current', (req, res) => {});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
