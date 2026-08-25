const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/paintings', express.static('oil_paintings'));

app.get('/api/paintings', (req, res) => {
  const dir = path.join(__dirname, 'oil_paintings');
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
