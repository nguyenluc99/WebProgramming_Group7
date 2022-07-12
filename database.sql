-- DO $$ BEGIN CREATE USER web WITH PASSWORD 'webprogramming' CREATEDB; EXCEPTION WHEN duplicate_object THEN RAISE NOTICE '%, moving to  next statement', SQLERRM USING ERRCODE = SQLSTATE; END $$;
DROP DATABASE IF EXISTS webprogramming;
CREATE DATABASE webprogramming;
-- \c postgresql://web:webprogramming@localhost/webprogramming

CREATE TABLE Users(
    userID SERIAL PRIMARY KEY NOT NULL,
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
    FOREIGN KEY(owner) REFERENCES Users(userID)
);
CREATE TABLE Location(
    locationID SERIAL PRIMARY KEY,
    locationName TEXT,
    neighbor INTEGER[100],
    distance INTEGER[100]
);
CREATE TABLE Journey(
    journeyID SERIAL PRIMARY KEY NOT NULL,
    requestID INTEGER[100],
    driverID INTEGER NOT NULL,
    vehicleID TEXT NOT NULL,
    timeStart TIMESTAMP NOT NULL,
    timeEnd TIMESTAMP NOT NULL,
    startLocationID INTEGER NOT NULL,
    destinationID INTEGER NOT NULL,
    journeyStatus TEXT NOT NULL,
    FOREIGN KEY (driverID) REFERENCES Users(userID),
    FOREIGN KEY (vehicleID) REFERENCES Vehicle(vehicleID),
    FOREIGN KEY (startLocationID) REFERENCES Location(locationID),
    FOREIGN KEY (destinationID) REFERENCES Location(locationID)
);
CREATE TABLE Request(
    requestID SERIAL PRIMARY KEY NOT NULL,
    journeyID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    startLocationID INTEGER NOT NULL,
    destinationID INTEGER NOT NULL,
    fee INTEGER NOT NULL,
    requestStatus TEXT NOT NULL,
    FOREIGN KEY (journeyID) REFERENCES Journey(journeyID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
);
INSERT INTO Users(fullName,phoneNumber,userName,email,userPassword) VALUES ('Viet', '0123456789','vietle', 'ledaiviet@gmail.com','vietle');
INSERT INTO Vehicle(vehicleID, vehicleType, owner, peopleCapacity, weightCapacity, volumeCapacity, description) VALUES ('A','Car', 1, 15, 20.5,30.0,'This car is great');
INSERT INTO Location(locationName, neighbor, distance) VALUES ('Ha Noi', '{2, 3}', '{100, 200}'), ('Ha Nam', '{1}', '{100}'), ('Bac Giang', '{1}','{200}');
INSERT INTO Journey(driverID, vehicleID, timeStart, timeEnd, startLocationID, destinationID, journeyStatus) VALUES (1, 'A', '2022-07-06 06:00:00+07', '2022-07-09 06:00:00+07', 1, 2,'OPEN');
INSERT INTO Request(journeyID, userID, startLocationID, destinationID, fee, requestStatus) VALUES (1, 1, 1, 2, 200, 'PENDING');