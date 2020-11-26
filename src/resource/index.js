const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { createItems } = require('@keystonejs/server-side-graphql-client');

const CarBrandSchema = require('../schemas/CarBrand');
const CarSizeSchema = require('../schemas/CarSize');
const CarSchema = require('../schemas/Car');

const keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: 'mongodb://localhost/keystone-lesson'
  }),
  onConnect: async keystone => {
    const carBrands = await createItems({
      keystone,
      listKey: 'CarBrand',
      items: [
        { data: { name: 'BMW' } },
        { data: { name: 'Lexus' } },
        { data: { name: 'Nissan' } }
      ],
      returnFields: ['id', 'name']
    });
    const carSizes = await createItems({
      keystone,
      listKey: 'CarSize',
      items: [
        { data: { length: 4910, width: 1891, height: 1456 } }, // BMW M5
        { data: { length: 4874, width: 1829, height: 1468 } }, // Nissan Altima
        { data: { length: 5306, width: 2030, height: 1925 } } // Nissan Armada
      ],
      returnFields: ['id', 'length', 'width', 'height']
    });
    await createItems({
      keystone,
      listKey: 'Car',
      items: [
        {
          data: {
            brand: {
              connect: {
                id: carBrands.find(({ name }) => name === 'BMW').id
              }
            },
            model: 'M5',
            engine: '4.0',
            size: {
              connect: {
                id: carSizes.find(({ length, width, height }) =>
                  length === 4910 &&
                  width === 1891 &&
                  height === 1456
                ).id 
              }
            }
          }
        },
        {
          data: {
            brand: {
              connect: {
                id: carBrands.find(({ name }) => name === 'Nissan').id
              }
            },
            model: 'Altima',
            engine: '2.5',
            size: {
              connect: {
                id: carSizes.find(({ length, width, height }) =>
                  length === 4874 &&
                  width === 1829 &&
                  height === 1468
                ).id 
              }
            }
          }
        },
        {
          data: {
            brand: {
              connect: {
                id: carBrands.find(({ name }) => name === 'Nissan').id
              }
            },
            model: 'Armada',
            engine: '5.6',
            size: {
              connect: {
                id: carSizes.find(({ length, width, height }) =>
                  length === 5306 &&
                  width === 2030 &&
                  height === 1925
                ).id 
              }
            }
          }
        }
      ],
    });

    console.log('\n>>> Items were added');
  }
});

keystone.createList('CarBrand', CarBrandSchema);
keystone.createList('CarSize', CarSizeSchema);
keystone.createList('Car', CarSchema);

const apps = [
  new GraphQLApp()
];

module.exports = {
  keystone,
  apps
};