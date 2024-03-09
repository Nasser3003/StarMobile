-- Insert values into `device` table
INSERT INTO db.device (brand, description, model, price) VALUES
('Device1', 'Description1', 'Model1', 100),
('Device2', 'Description2', 'Model2', 200),
('Device3', 'Description3', 'Model3', 300);


-- Insert values into `plan` table
INSERT INTO db.plan (plan_type, price, quota, signal_range) VALUES
(1, 50, 100, 'Range1'),
(2, 60, 150, 'Range2'),
(3, 70, 200, 'Range3');

-- Insert values into `user` table
INSERT INTO db.user (email, first_name, last_name, password) VALUES
('email1@example.com', 'John', 'Doe', 'password1'),
('email2@example.com', 'Jane', 'Smith', 'password2'),
('email3@example.com', 'Alice', 'Johnson', 'password3'),
('email4@example.com', 'Bob', 'Brown', 'password4'),
('email5@example.com', 'Emily', 'Wilson', 'password5');

-- Insert values into `line` table
INSERT INTO db.line (number, device_id) VALUES
('Line1', 1),
('Line2', 1),
('Line3', 2),
('Line4', 2),
('Line5', 3),
('Line6', 3);

-- Insert values into `user_plans` table
INSERT INTO db.user_plans (user_id, plans_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 2);
