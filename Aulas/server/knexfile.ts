//File created to translate JavaScript code to TypeScript
//knex execute with JavaScrips, not TypeScript, so he needs this translation because the project is using TypeScript

import path from 'path';

//Function to translate database and migrations from JS to TS
module.exports = { //Old syntax for "export default"
    client: 'sqlite3',
    connection: { //path to database file
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') //"src" and "database" are folder inside --dirname
    },
    migrations: { //path to migrations file
        directory: path.resolve (__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};