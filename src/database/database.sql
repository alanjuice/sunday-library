 CREATE TABLE BOOKS
(
    ID VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(64),
    AUTHOR VARCHAR(64),
    PRICE INT,
    PUBLISHER VARCHAR(64),
    CATEGORY VARCHAR(24),
    AVAILABLE BOOLEAN
);

CREATE TABLE TEACHERS
(
    ID VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(64),
    MNO INT,
    CLASSNAME VARCHAR(3),
    PASSWORD VARCHAR(64)
);

CREATE TABLE STUDENTS
(
    ID VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(64),
    CLASSNAME VARCHAR(3)
);

CREATE TABLE CONFIG
(
    KEY VARCHAR(20) PRIMARY KEY,
    VALUE VARCHAR(20)
);

CREATE TABLE ISSUES (
    ID SERIAL PRIMARY KEY,
    TID VARCHAR(5),
    SID VARCHAR(5),
    BID VARCHAR(5),
    RETURN_DATE DATE,
    BORROW_DATE DATE,
    FOREIGN KEY (TID) REFERENCES TEACHERS(ID),
    FOREIGN KEY (SID) REFERENCES STUDENTS(ID),
    FOREIGN KEY (BID) REFERENCES BOOKS(ID)
);


-- INSERT INTO CONFIG VALUES ("admin_pass","password");