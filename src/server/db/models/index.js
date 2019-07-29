const School = require('./School');
const Student = require('./Student');
const Session = require('./Session');

//Associations
School.hasMany(Student);
Student.belongsTo(School);

module.exports = {School, Student, Session}