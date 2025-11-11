exports.up = function(knex) {
  return knex.schema.createTable('discounts', (table) => {
    table.increments('id').primary();
    table
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.enu('discount_type', ['PERCENTAGE', 'FLAT']).notNullable();
    table.decimal('percentage', 5, 2).defaultTo(0.00);
    table.decimal('flat_amount', 10, 2).defaultTo(0.00);
    table.integer('used_count').defaultTo(0);
    table.decimal('min_purchase_amount', 10, 2);
    table.decimal('max_purchase_amount', 10, 2);
    table.timestamp('start_date').defaultTo(knex.fn.now());
    table.timestamp('end_date').nullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.index(['product_id', 'discount_type']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('discounts');
};
