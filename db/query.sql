
//view all departments and show department names and department ids
SELECT * FROM department;

//view all roles
SELECT role.id, role.title, role.salary, role.department_id FROM role;

-- view all employee
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- add a department
INSERT INTO department (name)
VALUES (name);

-- add a role
INSERT INTO role (title, salary, department_id)
VALUES (enter title, enter salary, enter department id);

-- add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (enter first name, enter last name, enter role id, enter manager id);

-- update an employee role 
UPDATE employee
SET role_id = enter role id
WHERE id = enter employee id;

// delete row from employee table where id = 20
DELETE FROM employee WHERE id = 20;