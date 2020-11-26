const { Integer } = require('@keystonejs/fields');

module.exports = {
  fields: {
    length: {
        type: Integer,
        isRequired: true
    },
    width: {
        type: Integer,
        isRequired: true
    },
    height: {
        type: Integer,
        isRequired: true
    }
  }
};