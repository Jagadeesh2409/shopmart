exports.up = function (knex) {
  return knex.schema.createTable('user_addresses', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('address_type', 50).notNullable(); // e.g. Home, Office
    table.string('full_name', 100).notNullable();
    table.string('mobile_number', 15).notNullable();
    table.string('address_line1', 255).notNullable();
    table.string('address_line2', 255);
    table.string('city', 100).notNullable();
    table.string('state', 100).notNullable();
    table.string('postal_code', 10).notNullable();
    table.string('country', 100).defaultTo('India');
    table.boolean('is_default').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_addresses');
};
