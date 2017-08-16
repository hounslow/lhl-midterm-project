
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes_resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('likes_resources').insert({resource_id: 1, user_id: 1, liked: false}),
        knex('likes_resources').insert({resource_id: 1, user_id: 2, liked: true}),
        knex('likes_resources').insert({resource_id: 2, user_id: 2, liked: true}),
        knex('likes_resources').insert({resource_id: 3, user_id: 3, liked: true})
      ]);
    });
};
