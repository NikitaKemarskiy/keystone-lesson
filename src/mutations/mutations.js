const _ = require('lodash');

module.exports = ({ carList, carSizeList }) => [
  {
    schema: 'addMeterToCar(id: ID!): Car',
    resolver: async (parent, { id }) => {
      const { adapter: carAdapter } = carList;
      const { adapter: carSizeAdapter } = carSizeList;);

      if (car.size) {
        const carSize = await carSizeAdapter.findById(car.size);
        await carSizeAdapter.update(car.size, {
          length: carSize.length + 1e3
        });
      }

      return car;
    }
  }
];