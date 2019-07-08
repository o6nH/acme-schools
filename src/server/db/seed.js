const db = require('.');
const { School, Student } = require('./models');

const schools = [
  {name: 'California Polytechnic State University', imageUrl: 'https://en.wikipedia.org/wiki/California_Polytechnic_State_University#/media/File:CalPoly_Seal.svg'},
  {name: 'California Institute of Technology', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Seal_of_the_California_Institute_of_Technology.svg'},
  {name: 'Princeton University', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Princetonshieldlarge.png'},
  {name: 'Stanford University', imageUrl: 'https://en.wikipedia.org/wiki/Stanford_University#/media/File:Stanford_University_seal_2003.svg'},
  {name: 'Harvard University', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg'},
];

const students = [
  'Buster Bunny',
  'Plucky Duck',
  'Hamton Pig',
  'Dizzy Devil',
  'Elmyra Duff',
  'Montana Max',
  'Hugo Campos',
  'Eric Katz',
  'Dan Schwab',
  'Johnathan Mann',
  'Preston Wallace'
  ]
  .map(fullName => {
    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names[1];
    const firstInitial = firstName.split('')[0].toLowerCase();
    const email = `${firstInitial}${lastName.toLowerCase()}@acme.com`;
    const gpa = Math.round(200+200*Math.random())/100;
    return {firstName, lastName, email, gpa}
  });

const seed = async () => {
  try {
    await db.sync({force: true});
    await School.bulkCreate(schools);
    await Student.bulkCreate(students);
    db.close();
  } catch (error) {
    console.error('Could not seed database.')
    db.close();
  }
};

seed();