exports.up = function (knex) {
  return knex.schema.createTable("pincodes", (table) => {
    table.increments("id").primary();
    table.string("pincode", 10).notNullable().unique();
    table.string("city", 100).notNullable();
    table.string("district", 100);
    table.string("state", 100).notNullable();
    table.string("country", 100).defaultTo("India");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pincodes");
};