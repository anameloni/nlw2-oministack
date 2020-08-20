//File responsible for the database connection
import knex from 'knex';
import path from 'path';

//Database creation. This function pass the required configurations for sqlite create de database
const db = knex({ 
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //--dirname returns the folder that contain the specified file. 
    },                                                       //create a file named database.sqlite inside __dirname. This file is the database
    useNullAsDefault: true, //sqlite requires to defines default values
});

export default db;

/*
Migrations: to control database versions, like GIT
*/