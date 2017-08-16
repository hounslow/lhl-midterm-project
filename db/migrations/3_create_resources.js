exports.up = function(knex, Promise) {
  return knex.schema.createTable("resources", (table) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.integer('topic_id').unsigned();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.foreign('topic_id').references('topics.id').onDelete('CASCADE');
    table.string('title');
    table.string('url');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("resources");
};
