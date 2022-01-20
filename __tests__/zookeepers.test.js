const fs = require('fs');
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers');

jest.mock('fs');

test('filter by query', () => {
  const startingKeepers = [
    {
      id: '0',
      name: 'Kim',
      age: 28,
      favoriteAnimal: 'dolphin',
    },
    {
      id: '3',
      name: 'Sven',
      age: 24,
      favoriteAnimal: 'gorilla',
    },
  ];

  const updateKeepers = filterByQuery(
    { favoriteAnimal: 'dolphin' },
    startingKeepers
  );

  expect(updateKeepers.length).toEqual(1);
});

test('find by id', () => {
  const startingKeepers = [
    {
      id: '0',
      name: 'Kim',
      age: 28,
      favoriteAnimal: 'dolphin',
    },
    {
      id: '3',
      name: 'Sven',
      age: 24,
      favoriteAnimal: 'gorilla',
    },
  ];

  const result = findById('3', startingKeepers);

  expect(result.name).toBe('Sven');
});

test('create a new zookeeper', () => {
  const zookeeper = createNewZookeeper(
    {
      id: '7',
      name: 'Brad',
      age: 30,
      favoriteAnimal: 'pig',
    },
    zookeepers
  );

  expect(zookeeper.id).toBe('7');
  expect(zookeeper.name).toBe('Brad');
  expect(zookeeper.age).toBe(30);
  expect(zookeeper.favoriteAnimal).toBe('pig');
});

test('validate zookeeper', () => {
  const startingKeeper = {
    id: '0',
    name: 'Kim',
    age: 28,
    favoriteAnimal: 'dolphin',
  };

  const invalidKeeper = {
    id: '3',
    age: 24,
    favoriteAnimal: 'gorilla',
  };

  const result = validateZookeeper(startingKeeper);
  const result2 = validateZookeeper(invalidKeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
