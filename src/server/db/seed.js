const db = require('.');
const { School, Student } = require('./models');

const schools = [
  {id: '09482cd6-cd5b-4b22-a22c-96c2683f537c', name: 'California Polytechnic State University', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d9/CalPoly_Seal.svg'},
  {id: '7609c5da-8946-4417-a537-c338028f999f', name: 'California Institute of Technology', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Seal_of_the_California_Institute_of_Technology.svg'},
  {id: 'f2fd8448-f4b9-4694-b823-89e3b1161ceb', name: 'Princeton University', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Princetonshieldlarge.png'},
  {id: 'bc8c7202-d6c9-48ea-81e3-a1f39a0f4bb5', name: 'Stanford University', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg'},
  {id: 'bff54ede-0b03-4c63-a379-7c79849a670e', name: 'Harvard University', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg'},
];

const students = [
  {id: '90fda51d-138f-438b-bcf7-bd8cace09d57', name: 'Buster Bunny', imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c6441c36-4dd4-4558-a300-0a074d430534/dd0b1ka-882701e9-d0cf-47ef-82e6-441a0dae2903.png/v1/fill/w_894,h_894,q_70,strp/goofy_face_buster_bunny__by_spongefox_dd0b1ka-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcL2M2NDQxYzM2LTRkZDQtNDU1OC1hMzAwLTBhMDc0ZDQzMDUzNFwvZGQwYjFrYS04ODI3MDFlOS1kMGNmLTQ3ZWYtODJlNi00NDFhMGRhZTI5MDMucG5nIiwid2lkdGgiOiI8PTEwMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.3KzUVbQxEIfxEulswrwhh7uPtaf9qUpY3deSfdtQ8Kg', password: 'password123'},
  {id: '18a964f1-9056-4377-924d-3b5c6d0095b9', name: 'Plucky Duck', imageUrl: 'https://vignette.wikia.nocookie.net/tinytoons/images/f/f9/Plucky_D.jpg/revision/latest?cb=20110217060912', password: 'password123'},
  {id: '4c11050c-4a7a-4c6a-bf99-9d221545b5bd', name: 'Hamton Pig', imageUrl: 'https://vignette.wikia.nocookie.net/tinytoons/images/c/c2/Hamton_J._Pig.jpg/revision/latest?cb=20110217061323', password: 'password123'},
  {id: '0cb00fd4-2ee9-4116-8134-a1ffa906b581', name: 'Dizzy Devil', imageUrl: null, password: 'password123'},
  {id: '5fb0c3c9-cb38-44c1-a583-498edbf2f5f2', name: 'Elmyra Duff', imageUrl: null, password: 'password123'},
  {id: '1e1c94b5-b45a-4b9e-aa59-41995717acf2', name: 'Montana Max', imageUrl: 'https://vignette.wikia.nocookie.net/tinytoons/images/5/55/Model_monty_color.jpg/revision/latest/scale-to-width-down/180?cb=20090127223558', password: 'password123'},
  {id: '70c63621-3d16-4f19-8569-036f28a52b69', name: 'Hugo Campos', imageUrl: 'https://media.licdn.com/dms/image/C5603AQGoUpmO8mzxtg/profile-displayphoto-shrink_200_200/0?e=1570060800&v=beta&t=SOgy3hDDRf8E14xyE53-brV2jYUy_srZxJw52ej4RXI', password: 'password123'},
  {id: '6804a2e9-7cc6-4c07-bb33-9405f47990f0', name: 'Eric Katz', imageUrl: 'https://media.licdn.com/dms/image/C4E03AQEXIPzS6uix5w/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=sgO_wbj34q8uOyPpepjFP87pGEpuVMt7DPwmTMRVXGE', password: 'password123'},
  {id: '60b12ed6-4882-4756-8ef9-b872df528655', name: 'Dan Schwab', imageUrl: 'https://media.licdn.com/dms/image/C5603AQGYotwKFDbRKQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=KfJX2B74SWGlAL-8yKQzEgMnqs6_9DfiE_j-nwz__oE', password: 'password123'},
  {id: '685906a3-942d-48ed-ba0b-80dd9ec1f72e', name: 'Johnathan Mann', imageUrl: 'https://media.licdn.com/dms/image/C5603AQGHzrQ7qRyYHA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=a82cUAf58E99ZXwwcEy_gDYuikPD7DUF9ls6mGhaDnQ', password: 'password123'},
  {id: '7378d9bd-68d2-4345-93dc-7a3f8c2c4055', name: 'Preston Wallace', imageUrl: 'https://media.licdn.com/dms/image/C5603AQHsW5v4e8uT9w/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=BqB-GACnOCbwF8FAhAqZqJiUjb8I22vIjnyJWgYP9RQ', password: 'password123'}
].map(student => {
    const {id, name, imageUrl, password} = student;
    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names[1];
    const firstInitial = firstName.split('')[0].toLowerCase();
    const email = `${firstInitial}${lastName.toLowerCase()}@acme.edu`;
    const gpa = name === 'Hugo Campos' ? 3.8 : Math.round(200+200*Math.random())/100;
    const schoolId = name.length < 11 
      ? schools[4].id 
      : (name === 'Hugo Campos' ? schools[0].id : null);
    return {id, firstName, lastName, email, gpa, schoolId, imageUrl, password}
  });

// Sync to DB then Seed Dummy Data 
const seed = async () => {
  try {
    await db.sync({force: true});
    await School.bulkCreate(schools);
    // await Student.bulkCreate(students); //BulkCreate did not catch on hook defined in Student Model
    await Promise.all(students.map(student => Student.create(student)));
    console.log('Synced DB. Seeded DB.');
  } catch (error) {
    console.error('Could not seed database:', error)
    db.close();
  }
};

module.exports = seed;