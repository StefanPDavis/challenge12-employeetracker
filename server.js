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

  const editEmployeeList = function () {
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
    }else if (answers.prompt === 'View All Roles') {
        db.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Roles: ");
            console.table(result);
            editEmployeeList();
        });
    } else if (answers.prompt === 'View All Employees') {
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Employees: ");
            console.table(result);
            editEmployeeList();
        });
    } else if (answers.prompt === 'Add A Department') {
        inquirer.prompt([{
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please Add A Department!');
                    return false;
                }
            }
        }]).then((answers) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.department} to the database.`)
                editEmployeeList();
            });
        })
    } else if (answers.prompt === 'Add A Role') {
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please Add A Role!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Please Add A Salary!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].name);
                        }
                        return array;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name === answers.department) {
                        var department = result[i];
                    }
                }

                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`)
                    editEmployeeList();
                });
            })
        });
    } else if (answers.prompt === 'Add An Employee') {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Please Add A First Name');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name?',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Please Add A Last Name');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Enter the Manager ID of the person who manages this employees department',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Please Add A Manager ID');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }

                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                    editEmployeeList();
                });
            })
        });
    } else if (answers.prompt === 'Update An Employee Role') {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employees role do you want to update?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].last_name);
                        }
                        var employeeArray = [...new Set(array)];
                        return employeeArray;
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is their new role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].last_name === answers.employee) {
                        var name = result[i];
                    }
                }

                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }

                db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                    if (err) throw err;
                    console.log(`Updated ${answers.employee} role to the database.`)
                    editEmployeeList();
                });
            })
        });
    }
    })
};

editEmployeeList();
