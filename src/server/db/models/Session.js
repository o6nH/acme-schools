const db = require('..');

const Session = db.define('session', {
  sessionId: {
    type: db.Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  //keeping 'userId' attribute in this Sequelize Session Store/Model, instead of 'studentId', in order to emphasize that the user (a.k.a., client) need not necessarily be one of the students in our Student Table/Model, and, instead, this Sequelize Session Store/Model could have allowed non-student users in their own separate table.
  userId: db.Sequelize.STRING,
  data: db.Sequelize.STRING(50000), //for connect-session-sequelize's defaults (extendDefaultFields)
  expires: db.Sequelize.DATE //for connect-session-sequelize's defaults
});

module.exports = Session;