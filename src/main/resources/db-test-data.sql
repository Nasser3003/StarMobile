-- Insert data into the line table
INSERT INTO line (number) VALUES
('Line 1'),
('Line 2'),
('Line 3');

-- Insert data into the device table
INSERT INTO device (brand, description, model, picture_path, price) VALUES
('Brand A', 'Description A', 'Model X', 'image1', 100),
('Brand B', 'Description B', 'Model Y', 'image2', 150),
('Brand C', 'Description C', 'Model Z', 'image3', 200);

-- Insert data into the plan table
INSERT INTO plan (plan_type, price, quota, signal_range, device_id) VALUES
(1, 50, 1000, 'Range A', 1),
(2, 70, 1500, 'Range B', 2),
(3, 60, 1200, 'Range C', 3);

-- Insert data into the user table
INSERT INTO user (email, first_name, last_name, password) VALUES
('user1@example.com', 'John', 'Doe', 'password1'),
('user2@example.com', 'Jane', 'Smith', 'password2');

-- Insert data into the user_device table
INSERT INTO user_devices (user_id, devices_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 1),
(2, 2),
(2, 3);