exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('phone_number').notNullable().unique();
        table.boolean("is_admin").notNullable().defaultTo(false);
        table.enum('status', ['PENDING', 'ACTIVE', 'BLOCKED']).defaultTo('PENDING');
        table.string('google_id');
        table.string('login_provider')
        table.boolean('is_email_verified').defaultTo(false);
        table.string('profile_img').unique();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
