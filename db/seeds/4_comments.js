
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({user_id: 1, resource_id: 1, content: 'Hey cool'}),
        knex('comments').insert({user_id: 2, resource_id: 2, content: 'Comment here'}),
        knex('comments').insert({user_id: 3, resource_id: 3, content: 'Looks interesting'})
      ]);
    });
};
