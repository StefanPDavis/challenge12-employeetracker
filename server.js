const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  let editEmployeeList = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }]
    ).then((answers) => {
        if (answers.prompt === 'View All Department') {
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Departments: ");
            console.table(result);
            editEmployeeList();
        });
    }
    })
};
