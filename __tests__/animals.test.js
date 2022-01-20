const fs = require('fs');
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require('../lib/animals.js');
const { animals } = require('../data/animals');

jest.mock('fs');

test('creates an animal object', () => {
  const animal = createNewAnimal(
    {
      name: 'Darlene',
      id: 'asdf92wef',
    },
    animals
  );

  expect(animal.name).toBe('Darlene');
  expect(animal.id).toBe('asdf92wef');
});

test('filters by query', () => {
  const startingAnimals = [
    {
      id: '5',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash'],
    },
    {
      id: '6',
      name: 'Steve',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave'],
    },
  ];

  const updatedAnimals = filterByQuery({ species: 'gorilla' }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});

test('finds by id', () => {
  const startingAnimals = [
    {
      id: '5',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash'],
    },
    {
      id: '6',
      name: 'Steve',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave'],
    },
  ];

  const result = findById('5', startingAnimals);

  expect(result.name).toBe('Erica');
});

test('validates personality traits', () => {
  const animal = {
    id: '6',
    name: 'Steve',
    species: 'bear',
    diet: 'carnivore',
    personalityTraits: ['impish', 'sassy', 'brave'],
  };

  const invalidAnimal = {
    id: '3',
    name: 'Kyle',
    species: 'snake',
    diet: 'carnivore',
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
