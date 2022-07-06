DO $$ BEGIN CREATE USER web WITH PASSWORD 'webprogramming' CREATEDB; EXCEPTION WHEN duplicate_object THEN RAISE NOTICE '%, moving to  next statement', SQLERRM USING ERRCODE = SQLSTATE; END $$;
DROP DATABASE IF EXISTS webprogramming;
CREATE DATABASE webprogramming OWNER web;
\c postgresql://web:webprogramming@localhost/webprogramming

CREATE TABLE Customer(
    customerID SERIAL PRIMARY KEY NOT NULL,
    fullName TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    userName TEXT NOT NULL,
    email TEXT NOT NULL,
    userPassword TEXT NOT NULL,
    listVehicles INTEGER[100]
);
CREATE TABLE Vehicle(
    vehicleID TEXT PRIMARY KEY NOT NULL,
    vehicleType TEXT NOT NULL,
    owner INTEGER NOT NULL,
    image TEXT[30],
    peopleCapacity INTEGER,
    weightCapacity FLOAT,
    volumeCapacity FLOAT,
    description TEXT,
    FOREIGN KEY(owner) REFERENCES Customer(customerID)
);
CREATE TABLE Location(
    locationID SERIAL PRIMARY KEY,
    locationName TEXT,
    neighbor INTEGER[100],
    distance INTEGER[100]
);
CREATE TABLE Rent(
    rentID SERIAL PRIMARY KEY NOT NULL,
    contractID INTEGER[100] NOT NULL,
    driverID INTEGER NOT NULL,
    vehicleID TEXT NOT NULL,
    timeStart TIME NOT NULL,
    timeEnd TIME NOT NULL,
    startLocationID INTEGER NOT NULL,
    destinationID INTEGER NOT NULL,
    FOREIGN KEY (driverID) REFERENCES Customer(customerID),
    FOREIGN KEY (vehicleID) REFERENCES Vehicle(vehicleID),
    FOREIGN KEY (startLocationID) REFERENCES Location(locationID),
    FOREIGN KEY (destinationID) REFERENCES Location(locationID)
);
CREATE TABLE Contract(
    contractID SERIAL PRIMARY KEY NOT NULL,
    rentID INTEGER NOT NULL,
    customerID INTEGER NOT NULL,
    startLocationID INTEGER NOT NULL,
    destinationID INTEGER NOT NULL,
    Fee INTEGER NOT NULL,
    FOREIGN KEY (rentID) REFERENCES Rent(rentID),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);
INSERT INTO Customer(fullName,phoneNumber,userName,email,userPassword) VALUES ('Viet', '0123456789','vietle', 'ledaiviet@gmail.com','vietle');
INSERT INTO Vehicle(vehicleID, vehicleType, owner, peopleCapacity, weightCapacity, volumeCapacity, description) VALUES ('A','Car', 1, 15, 20.5,30.0,'This car is great');