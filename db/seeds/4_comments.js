
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({user_id: 1, resource_id: 1, content: 'This Google website is cool!'}),
        knex('comments').insert({user_id: 2, resource_id: 2, content: 'Yahoo is fun!'}),
        knex('comments').insert({user_id: 3, resource_id: 3, content: 'I\'ve used facebook for years'}),
        knex('comments').insert({user_id: 2, resource_id: 3, content: 'Facebook has a nice interface!'})
      ]);
    });
};
