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

const getDepartmentId = () => {
    db.query(`SELECT department.id FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    })
};

//prompt user
// get a list of departments
const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM department`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

//get a list of role ids
const getRoleIds = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT role.id FROM role`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getManagerId = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT manager_id from employee`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

console.log(getManagerId());



//prompt user
const promptUser = async () => {
    try {
        // get list of departments
        const departments = await getDepartments();

        const answers = await inquirer.prompt([
            {
                type : 'list',
                message: 'What would you like to do?',
                name : 'choice',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee']
            }
        ]);

        if(answers.choice === 'View All Departments'){
            viewDepartments();
        } else if (answers.choice === 'View All Roles'){
            viewRoles();
        } else if (answers.choice === 'View All Employees'){
            viewEmployee();
        } else if (answers.choice === 'Add a Department'){
            const departmentAnswer = await 
            inquirer
            .prompt([
                {
                    type : 'input',
                    message: 'What is the name of the department',
                    name: 'department'
                }
            ]);

            addDepartment(departmentAnswer.department);
        } else if (answers.choice === 'Add a Role'){
            const roleAnswer = await 
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
                },
                {
                    type: 'list',
                    message: 'Choose a Department',
                    name: 'departmentId',
                    choices: departments.map(department => department.id)
                }
            ]);
        
            //get department id from departments
            const department_id = departments.find(department => department.id === roleAnswer.departmentId).id;
            addRole(roleAnswer.title, roleAnswer.salary, department_id);

        } else if (answers.choice === 'Add an Employee'){
            const roleId = await getRoleIds();
            const managerId = await getManagerId();
            const employeeAnswer = await 
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
                },
                {
                    type: 'list',
                    message: 'Choose a role Id',
                    name: 'roleId',
                    choices: roleId.map(role => role.id)
                },
                {
                    type: 'list',
                    message: 'Choose a manager Id',
                    name: 'managerId',
                    choices: managerId.map(manager => manager.id)
                }
            ]);
            const role_id = roleId.find(role => role.id === employeeAnswer.roleId).id;
            const manager_id = managerId.find(employee => manager_id === employeeAnswer.managerId).id;
            addEmployee(employeeAnswer.firstName, employeeAnswer.lastName, role_id, manager_id);
        }
    } catch (error) {
        console.log(error);
    }
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
const addRole = (title, salary, department_id) => {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', '${department_id}')`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
};


// add an employee
const addEmployee = (firstName, lastName, role_id, manager_id) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${role_id}', '${manager_id}')`, (err, results) => {
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
