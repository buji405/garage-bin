const items = [
  {
    id: 1,
    name: 'tutu',
    reason: 'ripped',
    cleanliness: 'sparkling',
  },
  {
    id: 2,
    name: 'shovel',
    reason: 'for diggin things',
    cleanliness: 'dusty',
  },
  {
    id: 3,
    name: 'old rug',
    reason: 'stains on it',
    cleanliness: 'rancid',
  },
];

exports.seed = (knex, Promise) => {
  return knex('item').del()
    .then(() => {
      return Promise.all(items.map((item) => {
        return knex('item').insert(item);
      }));
    })
};