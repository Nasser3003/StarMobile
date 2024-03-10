-- Insert data into the line table
INSERT INTO line (number) VALUES
(1111111111),
(1111111112),
(1111111113),
(1111111114),
(1111111115),
(1111111116),
(1111111117),
(1111111118),
(1111111119),
(2222222222),
(3333333333);

-- Insert data into the device table
INSERT INTO device (brand, description, model, price, line_id, plan_id, image) VALUES
('Brand A', 'Description A', 'Model X', 100, 1, 1, 'image1'),
('Brand A', 'Description A', 'Model X', 100, 2, 1, 'image1'),
('Brand A', 'Description A', 'Model X', 100, 3, 1, 'image1'),
('Brand B', 'Description B', 'Model Y', 150, 4, 2, 'image2'),
('Brand B', 'Description B', 'Model Y', 150, 5, 2, 'image2'),
('Brand B', 'Description B', 'Model Y', 150, 6, 2, 'image2'),
('Brand C', 'Description C', 'Model Z', 200, 7, 3, 'image3'),
('Brand C', 'Description C', 'Model Z', 200, 8, 3, 'image3'),
('Brand C', 'Description C', 'Model Z', 200, 9, 3, 'image3');

-- Insert data into the plan table
INSERT INTO plan (plan_type, price, quota, signal_range) VALUES
('SOLAR', 50, 1000, 'Range A'),
('GALACTIC', 70, 1500, 'Range B'),
('UNIVERSAL', 60, 1200, 'Range C');

-- Insert data into the user table
INSERT INTO user (email, first_name, last_name, password) VALUES
('user1@example.com', 'John', 'Doe', 'password1'),
('user2@example.com', 'Jane', 'Smith', 'password2');

-- Insert data into the user_device table
INSERT INTO user_devices (user_id, devices_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7);