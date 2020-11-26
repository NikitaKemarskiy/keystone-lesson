const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');

const getTypes = require('./types/types');
const getQueries = require('./queries/queries');
const getMutations = require('./mutations/mutations');

const CarBrandSchema = require('./schemas/CarBrand');
const CarSizeSchema = require('./schemas/CarSize');
const CarSchema = require('./schemas/Car');

const keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: 'mongodb://localhost/keystone-lesson'
  }),
});

const carBrandList = keystone.createList('CarBrand', CarBrandSchema);
const carSizeList = keystone.createList('CarSize', CarSizeSchema);
const carList = keystone.createList('Car', CarSchema);

keystone.extendGraphQLSchema({
  types: getTypes(),
  queries: getQueries(),
  mutations: getMutations({
    carBrandList,
    carSizeList,
    carList,
  })
});

const apps = [
  new GraphQLApp(),
  new AdminUIApp()
];

module.exports = {
  keystone,
  apps
};