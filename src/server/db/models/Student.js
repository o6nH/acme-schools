const db = require('..');

// Model Definition
const Student = db.define('student', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  gpa: {
    type: db.Sequelize.DECIMAL
  },
  imageUrl: {
    type: db.Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
});

// Class Methods
Student.putItUp = async function (id, newData) {
  const student = await this.findByPk(id);
  const updatedStudent = {...student, ...newData};
  return await student.update(updatedStudent, {fields: ['firstName', 'lastName', 'email', 'gpa', 'schoolId', 'imageUrl']});
};

Student.remove = async function (id) {
  const student = await this.findByPk(id);
  await student.destroy();
};

module.exports = Student;