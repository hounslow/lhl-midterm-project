
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(knex.raw('alter sequence users_id_seq restart')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({name: 'Matt', email: 'matt@mattlive.com', password: 'password'}),
        knex('users').insert({name: 'Hannah', email: 'hannah@hannah.com', password: 'password'}),
        knex('users').insert({name: 'Wing', email: 'wing@wingskitchen.com', password: 'password'})
      ]);
    })
  );
};
