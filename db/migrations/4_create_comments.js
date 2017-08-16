exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", (table) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.integer('resource_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.foreign('resource_id').references('resources.id').onDelete('CASCADE');
    table.string('content');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
}
