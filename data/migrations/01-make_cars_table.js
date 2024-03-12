exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', (table) => {
    table.increments('id').primary();
    table.string('vin').notNullable().unique();
    table.string('model').notNullable();
    table.integer('mileage').notNullable();
    table.string('title');
    table.string('transmission');
  })
};

exports.down = (knex) => {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};
