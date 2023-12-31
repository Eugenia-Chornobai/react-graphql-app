import { find, remove, filter } from "lodash";

const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: 2019,
    make: "Toyota",
    model: "Corolla",
    price: 40000,
    personId: "1",
  },
  {
    id: "2",
    year: 2018,
    make: "Lexus",
    model: "LX 600",
    price: 13000,
    personId: "1",
  },
  {
    id: "3",
    year: 2017,
    make: "Honda",
    model: "Civic",
    price: 20000,
    personId: "1",
  },
  {
    id: "4",
    year: 2019,
    make: "Acura ",
    model: "MDX",
    price: 60000,
    personId: "2",
  },
  {
    id: "5",
    year: 2018,
    make: "Ford",
    model: "Focus",
    price: 35000,
    personId: "2",
  },
  {
    id: "6",
    year: 2017,
    make: "Honda",
    model: "Pilot",
    price: 45000,
    personId: "2",
  },
  {
    id: "7",
    year: 2019,
    make: "Volkswagen",
    model: "Golf",
    price: 40000,
    personId: "3",
  },
  {
    id: "8",
    year: 2018,
    make: "Kia",
    model: "Sorento",
    price: 45000,
    personId: "3",
  },
  {
    id: "9",
    year: 2017,
    make: "Volvo",
    model: "XC40",
    price: 55000,
    personId: "3",
  },
];

const typeDefs = `
  type Person {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
    person: Person
  }
  
  type PersonWithCars {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Query {
    people: [Person]
    person(id: String!): Person
    personWithCars(id: String!): PersonWithCars
    cars: [Car]
    car(id: String!): Car
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    removeCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args) => {
      return find(people, { id: args.id });
    },
    personWithCars: (root, args) => {
      const person = find(people, { id: args.id });
      const personCars = filter(cars, { personId: args.id });
      return {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        cars: personCars,
      };
    },
    cars: () =>
      cars.map((car) => ({
        ...car,
        person: people.find((person) => person.id === car.personId),
      })),
    car: (root, args) => {
      const car = cars.find((car) => car.id === args.id);
      const owner = people.find((person) => person.id === car.personId);
      if (!owner) {
        throw new Error(`Couldn't find person with id ${car.personId}`);
      }
      return {
        id: car.id,
        year: car.year,
        make: car.make,
        model: car.model,
        price: car.price,
        personId: car.personId,
        // person: owner || null,
        person: {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName,
        },
      };
    },
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);

      return newPerson;
    },

    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });

      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },

    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id });

      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      remove(people, (c) => {
        return c.id === removedPerson.id;
      });

      return removedPerson;
    },

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);

      return newCar;
    },

    updateCar: (root, args) => {
      const index = cars.findIndex((car) => car.id === args.id);

      if (index === -1) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      const updatedCar = {
        ...cars[index],
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      cars[index] = updatedCar;

      const owner = people.find((person) => person.id === updatedCar.personId);
      if (!owner) {
        throw new Error(`Couldn't find person with id ${updatedCar.personId}`);
      }

      return {
        ...updatedCar,
        person: {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName,
        },
      };
    },

    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id });

      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      remove(cars, (c) => {
        return c.id === removedCar.id;
      });

      return removedCar;
    },
  },
};

export { typeDefs, resolvers };
