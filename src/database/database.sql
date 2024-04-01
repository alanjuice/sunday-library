CREATE TABLE TEACHERS
(
    ID VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(64),
    EMAIL VARCHAR(32),
    CLASSNAME VARCHAR(3),
    PASSWORD VARCHAR(64),
    STATUS BOOLEAN
);


CREATE TABLE STUDENTS
(
    ID VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(64),
    CLASSNAME VARCHAR(3),
    STATUS BOOLEAN
);


CREATE TABLE BOOK_CAT (
    ID  VARCHAR(5) PRIMARY KEY,
    NAME VARCHAR(32) NOT NULL,
    UNIQUE_COUNT INTEGER
);


 CREATE TABLE BOOKS
(
    ID VARCHAR(7) PRIMARY KEY,
    NAME VARCHAR(64),
    AUTHOR VARCHAR(64),
    PRICE INT,
    PUBLISHER VARCHAR(64),
    CAT_ID VARCHAR(24),
    AVAILABLE BOOLEAN,
    STATUS BOOLEAN,
    FOREIGN KEY (CAT_ID) REFERENCES BOOK_CAT(ID)
);


CREATE TABLE ISSUES (
    TID VARCHAR(5),
    SID VARCHAR(5),
    BID VARCHAR(7),
    RETURN_DATE DATE,
    BORROW_DATE DATE,
    FOREIGN KEY (TID) REFERENCES TEACHERS(ID),
    FOREIGN KEY (SID) REFERENCES STUDENTS(ID),
    FOREIGN KEY (BID) REFERENCES BOOKS(ID)
);

CREATE TABLE LOG(
    CLASS VARCHAR(3),
    ISSUE_DATE DATE,
    BOOK_ID VARCHAR(7),
    FOREIGN KEY (BOOK_ID) REFERENCES BOOKS(ID)
)

-- INSERT INTO CONFIG VALUES ("admin_pass","password");
-- status = false implies deleted?


