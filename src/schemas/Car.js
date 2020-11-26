const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
  fields: {
    brand: {
      type: Relationship,
      ref: 'CarBrand',
      isRequired: true
    },
    model: {
      type: Text,
      isRequired: true
    },
    engine: {
      type: Text,
      isRequired: true
    },
    size: {
      type: Relationship,
      ref: 'CarSize',
      isRequired: true
    }
  }
};