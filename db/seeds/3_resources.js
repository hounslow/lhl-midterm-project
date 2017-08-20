
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del().then(knex.raw('alter sequence resources_id_seq restart')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({ user_id: 1, topic_id: 1, title: 'Google Search', url : 'www.google.com', description: 'Google search engine'}),
        knex('resources').insert({ user_id: 2, topic_id: 1, title: 'Yahoo Search', url : 'www.yahoo.com', description: 'Yahoo search engine'}),
        knex('resources').insert({ user_id: 3, topic_id: 1, title: 'Facebook', url : 'www.facebook.com', description: 'Facebook'}),
      ]);
    })
    );
};
