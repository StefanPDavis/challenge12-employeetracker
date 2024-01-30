INSERT INTO department (name)
VALUES ("Marketing"),
       ("Sales"),
       ("IT"),
       ("HR"),
       ("Security");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 35000, 1),
       ("Sales Representative", 30000, 2),
       ("IT Technician", 40000, 3),
       ("Director of IT", 90000, 3),
       ("HR associate", 40000, 4),
       ("Director of HR", 75000, 4),
       ("Security Officer", 35000, 5),
       ("Head of Security", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, 1),
       ("Amira", "Afzal", 2, NULL),
       ("Christoper", "Lee", 3, NULL),
       ("Verónica", "Rodriguez", 4, 2),
       ("Igor", "Ivanov", 5, NULL),
       ("John", "Doe", 6, 3),
       ("Bob", "Robertson", 7, NULL),
       ("Steve", "Stevenson", 8, 4);