
Copy
const pool = require('../config/db');

exports.getAllRegistrations = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Registration');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createRegistration = async (req, res) => {
  const { firstName, lastName, email, dateOfBirth } = req.body;
  
  if (!firstName || !lastName || !email || !dateOfBirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO Registration (first_name, last_name, email, date_of_birth) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, dateOfBirth]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, dateOfBirth } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE Registration SET first_name = ?, last_name = ?, email = ?, date_of_birth = ? WHERE id = ?',
      [firstName, lastName, email, dateOfBirth, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({ id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM Registration WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({ message: 'Registration deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};