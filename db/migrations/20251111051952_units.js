exports.up = (knex) => {
  return knex.schema.createTable('units', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('abbreviation').notNullable().unique();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('units');
};
