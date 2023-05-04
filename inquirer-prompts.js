const inquirer = require('inquirer');

const promptUser = () => {
    inquirer
    .prompt([
        {
            type : 'list',
            message: 'What would you like to do?',
            name : 'WhatToDo',
            choice: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        }
    ])
    .then((answers) => {
        console.log(answers)
    })
    .catch((error) => {
        if(error.isTtyError) {
            console.log('prompt could not be rendered in the current environment');
        } else {
            console.log('Success!');
    }});
}

promptUser()