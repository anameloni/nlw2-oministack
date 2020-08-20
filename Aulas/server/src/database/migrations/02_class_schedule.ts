import Knex from 'knex';

//Which alterations will be done on the database
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable(); 
        table.integer('to').notNullable();

        //FOREIGN KEY
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

//How to undo the alterations - in case something went wrong
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
};