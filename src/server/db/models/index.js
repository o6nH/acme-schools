const School = require('./School');
const Student = require('./Student');

//Associations
School.hasMany(Student);
Student.belongsTo(School);

module.exports = {School, Student}