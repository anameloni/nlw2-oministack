import Knex from 'knex';

//Which alterations will be done on the database
export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary(); //Create a filed of type integer
        table.string('subject').notNullable(); //Create a filed of type var/char, that can't be null
        table.decimal('cost').notNullable(); 

        //FOREIGN KEY: Relations/connections between table 'users' and 'classes'
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

//How to undo the alterations - in case something went wrong
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
};