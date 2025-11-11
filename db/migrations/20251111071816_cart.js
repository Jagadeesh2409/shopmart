

exports.up = function(knex) {
    return knex.schema.createTable('cart', function(table) {
        table.increments('id').primary();
        table.integer('product_id').unsigned().notNullable();
        table.integer('quantity').unsigned().notNullable().defaultTo(1);
        table.decimal('unit_price', 10, 2).notNullable();
        table.decimal('total_price', 10, 2).notNullable();
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    }); 
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cart');
};
