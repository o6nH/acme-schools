# Acme-Schools
A junior-level app for practicing:
* Back-end with:
  - Sequelize
    + models
      1) `define`
    + model associations
      1) `Model.belongsTo`
      2) `Model.hasMany`
    + hooks
      1) `beforeCreate`
      2) `beforeUpdate`
      3) `beforeSave`
    + instances methdos || class methods
      1) `instance.create` || `Model.bulkCreate`
      2) `instance.destroy`|| `Model.bulkDestroy`
      3) `instance.update` || `Model.bulkUpdate`
    + queries
      1) `Model.find`
      1) `Model.findOrCreate`
      1) `Model.findAll`
  - Express
    + routes
      1) `app.get`
      2) `app.post`
      3) `app.put`
      4) `app.delete`
    + middleware
      1) `app.use`
    + api routes

* Front-end with:
  - React
    + components
      1) presentational components
      2) container components
  - Redux
    + state stores
    + state reducers
    + action types
    + action creators

# Dev Setup
## File Structure
In the root `acme-schools` project directory, create a `/dist` folder for the final distribution of the project and a `/src` folder for `/public` assets, `/client`-side code, and `/server`-side code. 

In the `src/client` directory create a `components` folder to store **React components**. 

In the `src/server` directory, create both a `/routes` folder and a `/db` folder to respectively store the **Express routes** that manage **HTTP requests** on port `3000` and the **Sequelize [<abbr title="Object-Relational Mapping">ORM</abbr>](https://www.google.com/search?q=orm)** that manage **SQL tables/models and queries** on a **PostgresSQL server** on port `5432` with the PostgreSQL client module, **pg**.

```bash
acme-schools
├───dist
└───src
    ├───client
    │   └───components
    ├───public
    └───server
        ├───db
        │   └───models
        └───routes
            └───api
```

## Initialize NPM
In the root project folder, create the `package.json` file.

```bash
npm init
```
> [!Note]: `node.js` includes `npm`.

## Initialize a Local Git Repo
In the root project folder, begin tracking your documents with `git`.

```bash
git init
```
### Add a `.gitignore`
To prevent the tracking of the `node_modules` directory and any private files, create a `.gitignore` file.

```git
<!-- .gitignore file -->
node_modules
password.js
```
> [!WARNING] 
> **RE: Git**
> Before committing, confirm that any files you expect to ignore are in the `.gitignore` file.


### Add a Remote Repo
Use a GitHub account to create a new [remote repo](https://help.github.com/en/articles/adding-an-existing-project-to-github-using-the-command-line), locals call `origin`, which links to a specified `remote repo URL`. 

```bash
git remote add origin https://github.com/o6nH/acme-schools.git
# To confirm, run:
git remote -v 
```

### Push Local Commit to Remote Repo
Add all files onto the git staging area and save a commit with a message to the local repo. Then, push a copy of the master the current master **branch** to a master branch upstream to the remote `origin` repo.

```bash
# To view status:
git status
# To stage and commit directory files:
git add .
git commit -m 'init commit'
# To push local master branch to a remote repo aliased as origin
git push -u origin master
```

# Backend: Database Setup
## Install Backend Database Server Modules
Install the necessary server modules: 

```bash
npm install sequelize pg pg-hstore
```

## Create PostgreSQL Database
Install [PostgreSQL](https://www.postgresql.org/download/). 

Save a *Role* username and password (perhaps via *pgAdmin4*).

Assuming the default role/username was kept (`postgres`), create a database called in the terminal.

```bash
createdb.exe -U postgres schools
```

### Verifying creation of database
To confirm PostgreSQL created the database either use `psql` in the command line or use the [pgAdmin4](https://www.pgadmin.org/docs/pgadmin4/dev/) <abbr title='Graphical User Interface'>GUI</abbr>

```bash
psql -U postgres
```

To *list* databases in `psql` run the `\l` command.

```psql
postgres=# \l
```

## Create a Database Connection with Sequelize
In `src/server/db` create a new [`index.js`](./src/server/db/index.js) file that establishes a connection to newly created database.

In general the code should look like this: 

```javascript
const Sequelize = require('sequelize');

const dialect = 'postgres';
const username = 'postgres';
const password = '';
const userInfo = `${username}:${password}`;
const host = 'localhost';
const port = process.env.DB_PORT || 5432;
const dbName = 'schools';

const dbUrl = process.env.DATABASE_URL || `${dialect}://${Boolean(username && password) ? `${userInfo}@`: ''}${host}:${port}/${dbName}`;

const db = new Sequelize(dbUrl, {logging: false});
/* Alternative:  
const db = new Sequelize(dbName, username, password, {
  dialect: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT||5432,
  logging: false
});
 */

db.authenticate()
  .then(()=>{
    console.log(`Sequelize successfully connected to: ${dbUrl}.`);
  })
  .catch(err => {
    console.error('Sequelize failed to connect to the DB: ', err);
  });

module.exports = db;
```

## Create Tables/Models in Database
Define a **schema** for the **models/tables** that will be added to our [`school`](#Create-a-Database-Connection-with-Sequelize) database above. Use the built-in Sequelize instance method `define()` in the new Sequelize connection (`db`) established. Include the model name and attributes with their options (like type and validation).

```javascript
const db = require('..');

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
  }
})

module.exports = Student;
```

```javascript
const db = require('..');

const School = db.define('student', {
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
```

## Model Associations
An `index.js` file could be added to the `/src/server/db/models` folder so that importing all models from other locations can be done in one line.

This is also a good place to [associate](http://docs.sequelizejs.com/manual/associations.html) all of our models.

```javascript
const School = require('./School');
const Student = require('./Student');

//Associations
School.hasMany(Student);
Student.belongsTo(School);

module.exports = {School, Student}

//elsewhere import with: 
//`const {School, Student} = require(`${rootPath}/src/server/db/models`); `
```

## Sync Connection To Database and Seed Data
In `package.js` include a `seed` script. 
```JSON
{... ,
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "seed": "node ./src/server/db/seed.js"
  },
...}
```

Create a `seed.js` file in `./src/server/db` directory. In the `seed.js` file, use `db.sync({force:true})`, to force the database connection to **drop old data tables/models** and synchronize with the *models* that were already defined and imported.

Afterwards, **seed** *dummy data* to the database by mapping each record to a model using `Model.create(value)`, or use `Model.bulkCreate()` to record the instances in an array of dummy data.

```javascript
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
```

### Verify Tables are Seeded and Update Dummy Data

Use the `pgAdmin4` GUI to update dummy data with `id` to avoid randomly generating new ids everytime we re-seed the database.

```javascript
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
]

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
    const gpa = Math.round(200+200*Math.random())/100;
    return {id, firstName, lastName, email, gpa}
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
```

# Backend: Express Server and API Routes
## Install Backend Express Server Modules
Install the necessary server modules: 

```bash
npm install express
```

## Create API Routes with Database Queries
In `/src/server/routes/api`, create `students.js` and `schools.js` route files that will be imported by `/src/server/routes/index.js`.

Create routes that will **[query](http://docs.sequelizejs.com/manual/models-usage.html)** the database depending on the api route in the URL.

Routes may redirect to pages or an api. Here the routes are a part handle api calls.

```javascript


```

## Add Class and Instance Methods to Models

```javascript


```

> [!Note]
> Use `function` notation, rather than arrow notation, to bind `this` to either the class/Model in class methods or instances in instance methods.


## Create Basic HTTP Routes
Express will handle HTTP requests depending on the pathname matched by the express `app`.


```javascript


```

## Create the Server's `start` Script
When `node` runs `./src/server/index.js`, Express should begin to listen on port `3000`.

The routes can be tested with [Postman](https://www.getpostman.com/) or browser.

> [!NOTE]
> Define `script.start:dev` property in the the `package.json` file that will run Express, and, in turn, listen for incoming HTTP requests.
>
>```json
>{
>  "scripts": {
>    "start:dev": "nodemon src/server/index.js --ignore dist --ignore src"
>  }
>}
>```

>```bash
> npm run start:dev
>```
>