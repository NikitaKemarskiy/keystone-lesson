const _ = require('lodash');

const MAX_SIZE = {
  length: 6e3,
  width: 2.2e3,
  height: 2.5e3
};

module.exports = () => [
  {
    schema: 'isSizeAcceptable(size: CarSizeInput): Boolean',
    resolver: async (parent, { size }) => _.keys(size).reduce((res, key) => res && size[key] <= MAX_SIZE[key], true)
  }
];