import Knex from 'knex';

//Which alterations will be done on the database
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        //FOREIGN KEY: Who?
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        //FOREIGN KEY: When?
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
};

//How to undo the alterations - in case something went wrong
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
};