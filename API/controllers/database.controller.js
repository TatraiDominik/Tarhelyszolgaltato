const { createDatabase, createUser, grantPrivileges } = require('../services/database.service');

exports.createDatabase = async (req, res) => {
  const { dbname } = req.body;
  if (!dbname) {
    return res.status(400).json({ message: 'Database name is required!' });
  }

  try {
    await createDatabase(dbname);
    res.status(200).json({ message: 'Database created successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required!' });
  }

  try {
    const { password } = await createUser(username);
    res.status(200).json({ message: 'User created successfully!', password });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.grantPrivileges = async (req, res) => {
  const { username, dbname, privileges } = req.body;
  if (!username || !dbname || !privileges) {
    return res.status(400).json({ message: 'Missing data!' });
  }

  try {
    await grantPrivileges(username, dbname, privileges);
    res.status(200).json({ message: `Granted ${privileges} to ${username} on ${dbname}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
