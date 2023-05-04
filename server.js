const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001
const app = express();
const inquirer = require('inquirer');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqldatabase',
    database: 'employee_db'

},
console.log('connected to employee_db')
);

const promptUser = () => {
inquirer
    .prompt([
        {
            type : 'list',
            message: 'What would you like to do?',
            name : 'WhatToDo',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        }
    ])
    .then((answers) => {
        console.log(answers)
        if(answers.WhatToDo === 'View All Departments'){
            viewDepartments();
        } else if (answers.WhatToDo === 'View All Roles'){
            viewRoles();
        } else if (answers.WhatToDo === 'View All Employees'){
            viewEmployee();
        } else if (answers.WhatToDo === 'Add a Department'){
            inquirer
            .prompt([
                {
                    type : 'input',
                    message: 'What is the name of the department',
                    name: 'department'
                }
            ])
            .then((answers) => {
                addDepartment(answers.department);
            })
        } else if (answers.WhatToDo === 'Add a Role'){
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the title of the role?',
                    name: 'title'
                },
                   {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'salary'
                   }
            ])
            .then((answers) => {
                addRole(answers.title, answers.salary);
            })
        } else if (answers.WhatToDo === 'Add an Employee'){
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter a first name',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'Enter a last name',
                    name: 'lastName'
                }
            ])
            .then((answers) => {
                addEmployee(answers.firstName, answers.lastName)
            })   
        }
    })
    .catch((error) => {
        if(error.isTtyError) {
            console.log('prompt could not be rendered in the current environment');
        } else {
            console.log('Success!');
}});
};
promptUser();

//View all departments
const viewDepartments = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

//view all roles
const viewRoles = () => {
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

// view all employees
const viewEmployee = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

//add department
const addDepartment =(department) => {
    db.query(`INSERT INTO department (name) VALUES ('${department}')`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

//add a role
const addRole = (title, salary) => {
    db.query(`INSERT INTO role (title, salary) VALUES ('${title}', '${salary}')`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};

// add an employee
const addEmployee = (firstName, lastName) => {
    db.query(`INSERT INTO employee (first_name, last_name) VALUES ('${firstName}', '${lastName}')`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};


        
    //run server
    app.listen(PORT, () => {
        console.log('server running on port 3001');    
    });
