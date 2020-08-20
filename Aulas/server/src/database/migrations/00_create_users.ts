import Knex from 'knex';

//Which alterations will be done on the database
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary(); //Create a filed of type integer
        table.string('name').notNullable(); //Create a filed of type var/char, that can't be null
        table.string('avatar').notNullable(); 
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
};

//How to undo the alterations - in case something went wrong
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
};