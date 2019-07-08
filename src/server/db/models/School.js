const db = require('..');

const School = db.define('school', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: db.Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = School;