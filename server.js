const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );