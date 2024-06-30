CREATE DATABASE changeOfBooks;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userClient VARCHAR(255),
    emailClient VARCHAR(255) UNIQUE,
    passClient VARCHAR(255),
    birthClient DATE,
    phoneClient VARCHAR(11)
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    currentCondition VARCHAR(50),
    description VARCHAR(500),
    situation BOOLEAN,
    fk_user_idUser INTEGER,
    FOREIGN KEY (fk_user_idUser)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE proposal (
    idProposalBook INTEGER PRIMARY KEY AUTO_INCREMENT,
    fk_user_idUser INTEGER,
    fk_book_idBook INTEGER,
    createdProposal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_user_idUser)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fk_book_idBook)
        REFERENCES books (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);