import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

function App() {
  const [vin, setVin] = useState('');
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const res = await fetch('/history');
    const data = await res.json();
    setHistory(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vin) return;
    await fetch('/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vin })
    });
    setVin('');
    loadHistory();
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#f5f5f5', p: 2 }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center">VIN Lookup</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <TextField
            label="Enter VIN"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit">Lookup</Button>
        </form>

        <Typography variant="h6" gutterBottom align="center">History</Typography>
        <Box display="flex" justifyContent="center">
          <Table sx={{ maxWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>VIN</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.vin}</TableCell>
                  <TableCell>{row.make}</TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
