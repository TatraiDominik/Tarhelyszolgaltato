
const { generatePassword } = require('../utils/password.generator');
const db = require('../config/database');

exports.createDatabase = async (dbname) => {
  try {
    await db.query(`CREATE DATABASE \`${dbname}\``);
    console.log(`Database ${dbname} created successfully.`);
  } catch (err) {
    console.error(`Error creating database: ${err.message}`);
    throw err;
  }
};

exports.createUser = async (username) => {
  const password = generatePassword();
  try {
    await db.query(`CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`);
    console.log(`User ${username} created successfully.`);
    return { username, password };
  } catch (err) {
    console.error(`Error creating user: ${err.message}`);
    throw err;
  }
};

exports.grantPrivileges = async (username, dbname, privileges = 'SELECT, INSERT, UPDATE, DELETE') => {
  try {
    await db.query(`GRANT ${privileges} ON \`${dbname}\`.* TO '${username}'@'localhost'`);
    console.log(`Privileges granted successfully to ${username} on database ${dbname}.`);
  } catch (err) {
    console.error(`Error granting privileges: ${err.message}`);
    throw err;
  }
};