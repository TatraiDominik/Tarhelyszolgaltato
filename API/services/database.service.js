const { Sequelize } = require('sequelize');
const { generatePassword } = require('../utils/password.generator');
const db = require('../config/database');

exports.createDatabase = async (dbname) => {
  try {
    await db.query(`CREATE DATABASE \`${dbname}\``);
  } catch (err) {
    throw new Error(`Error creating database: ${err.message}`);
  }
};

exports.createUser = async (username) => {
  const password = generatePassword();
  try {
    await db.query(`CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`);
    return { username, password };
  } catch (err) {
    throw new Error(`Error creating user: ${err.message}`);
  }
};

exports.grantPrivileges = async (username, dbname, privileges) => {
  try {
    await db.query(`GRANT ${privileges} ON \`${dbname}\`.* TO '${username}'@'localhost'`);
  } catch (err) {
    throw new Error(`Error granting privileges: ${err.message}`);
  }
};
