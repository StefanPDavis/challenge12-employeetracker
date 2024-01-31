INSERT INTO department (name)
VALUES ("Marketing"),
       ("Sales"),
       ("IT"),
       ("HR"),
       ("Security");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Associate", 35000, 1),
       ("Sales Representative", 30000, 2),
       ("IT Technician", 40000, 3),
       ("HR Representative", 40000, 4),
       ("Security Officer", 35000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, 1),
       ("Amira", "Afzal", 2, 1),
       ("Christoper", "Lee", 3, 2),
       ("Veronica", "Rodriguez", 4, 3),
       ("Igor", "Ivanov", 5, 4);
