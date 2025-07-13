const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

// MySQL connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'priyanka',
  database: 'vin_lookup'
});

conn.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL 8.0');
});

// API: Lookup VIN and save to DB
app.post('/lookup', async (req, res) => {
  const vin = req.body.vin;
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesExtended/${vin}?format=json`;
  const apiRes = await fetch(url);
  const data = await apiRes.json();
  const result = data.Results[0];
  const { Make, Model, ModelYear } = result;

  conn.query(
    'INSERT INTO vin_history (vin, make, model, year) VALUES (?, ?, ?, ?)',
    [vin, Make, Model, ModelYear || null],
    (err) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// API: Get history
app.get('/history', (req, res) => {
  conn.query('SELECT vin, make, model, year FROM vin_history ORDER BY id DESC', (err, rows) => {
    if (err) throw err;
    const yearNow = new Date().getFullYear();
    const data = rows.map(row => ({
      vin: row.vin,
      make: row.make,
      model: row.model,
      age: row.year ? yearNow - row.year : 'N/A'
    }));
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
