
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del().then(knex.raw('alter sequence resources_id_seq restart')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({ user_id: 1, topic_id: 1, title: 'whatever just do random', url : 'www.google.com', description: 'this is google'}),
        knex('resources').insert({ user_id: 2, topic_id: 2, title: 'just google', url : 'www.yahoo.com', description: 'yahoooooo'}),
        knex('resources').insert({ user_id: 2, topic_id: 3, title: 'we will just test this', url: 'www.idunno.com', description: 'I want to come back to this'})
      ]);
    })
    );
};
