const db = require('..');

const Session = db.define('session', {
  sid: {
    type: db.Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: db.Sequelize.STRING
  },
  data: db.Sequelize.STRING(50000), //for connect-session-sequelize's defaults (extendDefaultFields)
  expires: db.Sequelize.DATE //for connect-session-sequelize's defaults
});

module.exports = Session;