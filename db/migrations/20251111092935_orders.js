exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.string("invoice_no", 255).notNullable().unique();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("quantity").notNullable();
    table
      .enu("payment_method", ["Cash on Delivery"])
      .notNullable()
      .defaultTo("Cash on Delivery");
    table
      .integer("pincode_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("pincodes")
      .onDelete("SET NULL");
    table
      .enu("other_charge", ["Standard", "Express", "Free", "Custom"])
      .notNullable()
      .defaultTo("Standard");
    table.decimal("tax", 10, 2).defaultTo(0.0);
    table.decimal("discount", 10, 2).defaultTo(0.0);
    table.decimal("total_price", 10, 2).notNullable();
    table
      .integer("shipping_address")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user_addresses")
      .onDelete("CASCADE");
    table
      .enu("status", ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"])
      .notNullable()
      .defaultTo("Pending");
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orders");
};
