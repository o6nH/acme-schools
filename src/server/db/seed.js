const db = require('.');
const { School, Student } = require('./models');

const schools = [
  {id: '09482cd6-cd5b-4b22-a22c-96c2683f537c', name: 'California Polytechnic State University', imageUrl: 'https://en.wikipedia.org/wiki/California_Polytechnic_State_University#/media/File:CalPoly_Seal.svg'},
  {id: '7609c5da-8946-4417-a537-c338028f999f', name: 'California Institute of Technology', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Seal_of_the_California_Institute_of_Technology.svg'},
  {id: 'f2fd8448-f4b9-4694-b823-89e3b1161ceb', name: 'Princeton University', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Princetonshieldlarge.png'},
  {id: 'bc8c7202-d6c9-48ea-81e3-a1f39a0f4bb5', name: 'Stanford University', imageUrl: 'https://en.wikipedia.org/wiki/Stanford_University#/media/File:Stanford_University_seal_2003.svg'},
  {id: 'bff54ede-0b03-4c63-a379-7c79849a670e', name: 'Harvard University', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg'},
];

const studentIds = [
  '90fda51d-138f-438b-bcf7-bd8cace09d57',
  '18a964f1-9056-4377-924d-3b5c6d0095b9',
  '4c11050c-4a7a-4c6a-bf99-9d221545b5bd',
  '0cb00fd4-2ee9-4116-8134-a1ffa906b581',
  '5fb0c3c9-cb38-44c1-a583-498edbf2f5f2',
  '1e1c94b5-b45a-4b9e-aa59-41995717acf2',
  '70c63621-3d16-4f19-8569-036f28a52b69',
  '6804a2e9-7cc6-4c07-bb33-9405f47990f0',
  '60b12ed6-4882-4756-8ef9-b872df528655',
  '685906a3-942d-48ed-ba0b-80dd9ec1f72e',
  '7378d9bd-68d2-4345-93dc-7a3f8c2c4055'
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
  .map((fullName, index) => {
    const id = studentIds[index];
    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names[1];
    const firstInitial = firstName.split('')[0].toLowerCase();
    const email = `${firstInitial}${lastName.toLowerCase()}@acme.com`;
    const gpa = fullName === 'Hugo Campos' ? 3.8 : Math.round(200+200*Math.random())/100;
    const schoolId = fullName.length < 11 
      ? schools[4].id 
      : (fullName === 'Hugo Campos' ? schools[0].id : null);
    return {id, firstName, lastName, email, gpa, schoolId}
  });

const seed = async () => {
  try {
    await db.sync({force: true});
    await School.bulkCreate(schools);
    await Student.bulkCreate(students);
    console.log('Synced DB. Seeded DB.')
    db.close();
  } catch (error) {
    console.error('Could not seed database.')
    db.close();
  }
};

seed();