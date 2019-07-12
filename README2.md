# Frontend: Server's Root (`index.html`)
The first thing that the Express server should be able to server is the static `index.html` at `http://${host}:3000/`.

In the `/src/server/index.js`, change the static route to: 

```javascript
//Static file in public folder 
app.get('/', express.static(path.join(__dirname, '../public')))
//(TODO: change location to '../../dist' after Webpack bundles)
```

# Frontend: Module Bundler and Code Compiler
## Install Webpack Module Bundler
Install [Wepback](https://webpack.github.io/) and `webpack-cli`, in order to bundle the `src/public/index.html`, as well as any corresponding `<link>` and `<script>` files, into static files in the `dist` directory.

```bash
npm install webpack webpack-cli --save-dev
```

Create a `webpack.config.js` file that will be configured later.

## Install Babel Modules
Install [Babel](https://babeljs.io/setup#installation) modules for *Webpack* and [Nodemon](./README.md#Create-the-Server's-`start`-Script), in order to code the front-end with newer ES6 syntax, which includes the deconstructed imports, default exports, polyfilled async-awaits, sugared classes, etc., install [Babel](https://babeljs.io/setup#installation) modules for *Webpack* and *Nodemon*. Babel will also change the React JSX to JS.

These Babel modules will be used by [Wepback](https://webpack.github.io/) to bundle your module's into static `output` code files that made accessible by the *Express server*.

After Webpack finishes the bundling (which will happen periodically, if `webpack` is run with the `-w`tag, in order to watch the files that are linked to the **`entry`-point** indicated by the `webpack.config.js` file), it, by default, outputs a `main.js` file to the `dist` directory, which is created if non-existant. 

Install the `@babel/core`, `@babel/polyfill`, and `babel-loader`. The `babel-loader` will let webpack use `@babel-core` and `@babel/polyfill` try to convert any new JS or JSX files, starting with the `entry`-point file, to the bundled vanilla `dist/main.js` file.

```bash
# TODO: In package.json, include a target in the preset environment to avoid the deprecated polyfill under babel.preset = ["@babel/preset-react", ["@babel/preset-env", "target":{"node":10}]
npm install @babel-core @babel/polyfill babel-loader --save-dev
```

## Configure `webpack.config.js`
By default Webpack will look for the `entry`-point at `src/index.js`, but, here, it should look at `src/client/index.js`, which is where the first React components (`<App/>`) with JSX will be rendered to the <abbr title='Document Object Model'>DOM</abbr>.

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'src', 'client', 'index.js')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        loader: 'babel-loader'
      }
    ]
  }
}
```

## Configure `.bablerc`
Create the Babel config file, `.babelrc`, and include **presets** (or a collection of *plug-ins*) in order for Babel to recognize both the React code with JSX and the plain JS it needs to transpile.

```bash
npm i @babel/preset-react @babel/preset-env --save-dev
```

```json
{
  "presents": [
    "@babel/preset-react",
    "@babel/preset-env"
    ]
    /*
    Babel uses these "presets" to know how to transpile your code:
      'react': teaches Babel to recognize JSX
      'env': teaches Babel to transpile Javascript. You can reduce the size of your bundle by limiting the number of features/plug-ins you transpile. Learn more at: https://github.com/babel/babel-preset-env
    */
}
```

# Frontend: Create React Components and Connect Redux State and Dispatcher
Intall `react` and `react-dom`.
```bash
npm install react react-dom --save-dev
```

## Run Webpack
Nodemon script was defined [above](#Create-the-Server's-`start`-Script).

```json
{
  // ...
  "scripts": {
    // ...
    "bundle:dev": "webpack --watch",
    "start:dev": "nodemon src/server/index.js --ignore dist --ignore src",
  }
  // ...
}
```

```bash
npm run bundle:dev
```








Install `react-router-dom`
```bash
npm install react-router-dom --save-dev
```















# Frontend: Create Redux Store

## Define Action/Thunk Creators 
Install `redux` and `redux-thunks`
## Create Container Components From Presentational Components
Install `react-redux`
### Connect Redux Store (State and Dispatchers) To React Props











```bash
npm install redux redux-thunks
```

Define how a *Redux store's* **state** should look in order to replace the stateful components' deeper in the component tree.

Define **reducers** with an initial state set as the optional parameter, because state should never be allowed to be `undefined`. This condition is checked by `combineReducers`.

Define **actions constants** that will update the **store**'s *state*. Define **actions** that will h

Define the **actions** that should be used by the *dispatch* function inside of a **thunks** returned by a **thunk creator**.

> [!Note]
> **Thunks** are called with `dispatch`, `getState`, and whatever extra arguments are passed to `thunkMiddleware.withExtraArguments()` when the *store* was created.
> ```javascript
> import {createStore, combineReducers, applyMiddleware} from 'redux';
> import loggingMiddleware from 'redux-logger';
> import thunkingMiddleware from 'redux-thunk';
> import {reducer, reducer2} from './reducers';
>
> const preloadedInitState = {};
>
> const store = createStore(combinedReducers(reducer, reducer2), preloadedInitState, applyMiddleware(loggingMiddleware, thunkingMiddleware.withExtraArgument(axios)));
>
>export default store;
> ```

```javascript
// in action creator module:
const thunkedLogin = () =>
  (dispatch, getState, axios) => // thunk now also receives `axios` dep.
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })
```

## Combine Reducers

## Create a Redux Store
In 
```javascript
//FS CODE:
// in store instantiation module:
import axios from 'axios'

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(axios))
)

///
```

### Fetch API Data with Axios Middleware
In order to make HTTP requests to our `/server/routes/api`, install `axios`.

```bash
npm install axios
```

Wrap `axios` calls with store's dispatch