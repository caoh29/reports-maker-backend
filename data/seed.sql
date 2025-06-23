-- DROP TABLES (in correct order to avoid foreign key violations)
DROP TABLE IF EXISTS "EmployeeBenefit";
DROP TABLE IF EXISTS "Employee";
DROP TABLE IF EXISTS "Benefit";
DROP TABLE IF EXISTS "Department";
-- CREATE DEPARTMENTS
CREATE TABLE "Department" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO "Department" (name)
VALUES ('Engineering'),
    ('Design'),
    ('Management'),
    ('Human Resources'),
    ('IT Support'),
    ('Accounting');
-- CREATE BENEFITS
CREATE TABLE "Benefit" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO "Benefit" (name)
VALUES ('Dental Care'),
    ('Phone Plan'),
    ('Paid Vacation'),
    ('Retirement Plan'),
    ('Gym Membership');
-- CREATE EMPLOYEES
CREATE TABLE "Employee" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    work_time TIME NOT NULL,
    hours_per_day INT NOT NULL,
    work_schedule VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    document_type VARCHAR(30),
    document_number VARCHAR(50) UNIQUE,
    salary FLOAT,
    hourly_rate FLOAT,
    contract_type VARCHAR(10) DEFAULT 'SALARIED',
    department_id INT REFERENCES "Department"(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
-- INSERT SAMPLE EMPLOYEES
INSERT INTO "Employee" (
        name,
        position,
        start_date,
        work_time,
        hours_per_day,
        work_schedule,
        document_type,
        document_number,
        salary,
        hourly_rate,
        contract_type,
        department_id
    )
VALUES (
        'John Perez',
        'Developer',
        '2021-01-15',
        '09:00',
        8,
        'Monday to Friday, 9am - 5pm',
        'ID',
        '1234567890',
        72000,
        NULL,
        'SALARIED',
        1
    ),
    (
        'Anna Gomez',
        'Designer',
        '2020-03-22',
        '10:00',
        6,
        'Monday to Friday, 10am - 4pm',
        'ID',
        '2345678901',
        NULL,
        40,
        'HOURLY',
        2
    ),
    (
        'Charles Sanchez',
        'Manager',
        '2018-11-05',
        '08:00',
        9,
        'Monday to Friday, 8am - 5pm',
        'ID',
        '3456789012',
        95000,
        NULL,
        'SALARIED',
        3
    ),
    (
        'Maria Lopez',
        'Analyst',
        '2019-07-11',
        '09:30',
        7,
        'Monday to Friday, 9:30am - 4:30pm',
        'ID',
        '4567890123',
        NULL,
        45,
        'HOURLY',
        1
    ),
    (
        'Peter Rodriguez',
        'Programmer',
        '2021-09-14',
        '11:00',
        6,
        'Monday to Friday, 11am - 5pm',
        'ID',
        '5678901234',
        68000,
        NULL,
        'SALARIED',
        1
    ),
    (
        'Sarah Morales',
        'HR Specialist',
        '2019-09-23',
        '08:00',
        7,
        'Monday to Friday, 8am - 3pm',
        'ID',
        '7890123456',
        60000,
        NULL,
        'SALARIED',
        4
    ),
    (
        'Charles Smith',
        'HR Manager',
        '2017-10-23',
        '08:00',
        7,
        'Monday to Friday, 8am - 3pm',
        'ID',
        '8709133987',
        80000,
        NULL,
        'SALARIED',
        4
    ),
    (
        'David Vega',
        'Developer',
        '2022-02-14',
        '09:30',
        7,
        'Monday to Friday, 9:30am - 4:30pm',
        'ID',
        '8901234567',
        NULL,
        42,
        'HOURLY',
        1
    );
-- CREATE EMPLOYEE-BENEFIT JOIN TABLE
CREATE TABLE "EmployeeBenefit" (
    employee_id INT REFERENCES "Employee"(id),
    benefit_id INT REFERENCES "Benefit"(id),
    PRIMARY KEY (employee_id, benefit_id)
);
-- ASSIGN BENEFITS TO EMPLOYEES
INSERT INTO "EmployeeBenefit" (employee_id, benefit_id)
VALUES (1, 1),
    (1, 3),
    -- John Perez: Dental + Paid Vacation
    (2, 2),
    -- Anna Gomez: Phone Plan
    (3, 1),
    (3, 4),
    (3, 5),
    -- Charles Sanchez: Dental, Retirement, Gym
    (4, 3),
    -- Maria Lopez: Paid Vacation
    (5, 1),
    (5, 2),
    -- Peter Rodriguez: Dental + Phone Plan
    (6, 1),
    (6, 3),
    -- Sarah Morales: Dental + Paid Vacation
    (7, 2),
    (7, 5),
    -- Charles Smith: Phone Plan + Gym
    (8, 2),
    (8, 5);
-- David Vega: Phone Plan + Gym