
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics').del().then(knex.raw('alter sequence topics_id_seq restart')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('topics').insert({name: 'Computer Science'}),
        knex('topics').insert({name: 'Web Design'}),
        knex('topics').insert({name: 'Search Engines'})
      ]);
    })
    );
};
