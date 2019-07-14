# Frontend: Server's Root (`index.html`)
The first thing that the Express server should be able to server is the static `index.html` at `http://${host}:3000/`.

In the `/src/server/index.js`, change the static route to: 

```javascript
//Static file in public folder
app.use('/dist', express.static(path.join(__dirname,'..', '..', 'dist')));
app.get('/', express.static(path.join(__dirname, '..', 'public')));
//(TODO: change location to '../../dist' after Webpack bundles)npm
```

In the `/src/public/index.html`, `defer` the import of the `dist/main.js` script until after the **'root'** div has loaded.

```html
<!DOCTYPE html>
<!-- html[lang='en']>(head>meta[charset='UTF-8']+meta[name='viewport'][content='width=device-width, initial-scale=1.0']+title)+body>div#root -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- scrc is the default output file that webpack will eventually generate  -->
  <script src="/dist/main.js" defer></script>
  <title>ACME Schools</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

# Frontend: Module Bundler and Code Compiler
## Install Webpack Module Bundler
Install [Wepback](https://webpack.github.io/) and `webpack-cli`, in order to bundle the `src/client/index.js`, as well as any corresponding file dependencies into static files in the `dist` directory.

```bash
npm install webpack webpack-cli --save-dev
```

## Configure `webpack.config.js`
Create an `entry` file (`src/client/index.js`) for Webpack to begin working; this is where React will begin rendering for the <abbr title='Document Object Model'>DOM</abbr> DOM.

Create a `webpack.config.js` file with the following code:

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

> [!NOTE] By default Webpack will look for the `entry`-point at `src/index.js`, but, here, it should look at `src/client/index.js`; this is the file from which the root components (`<App/>`) is rendered to the DOM.

## Install Babel Modules
Install [Babel](https://babeljs.io/setup#installation) modules for *Webpack* and [Nodemon](./README.md#Create-the-Server's-`start`-Script), in order to code the front-end with newer ES6 syntax, which includes the deconstructed imports, default exports, polyfilled async-awaits, sugared classes, etc. Babel will also change the React JSX to JS.

These Babel modules will be used by [Wepback](https://webpack.github.io/) to bundle your module's into static `output` code files that made accessible by the *Express server*.

After Webpack finishes the bundling (which will happen periodically, if `webpack` is run with the `-w`tag, in order to watch the files that are linked to the **`entry`-point** indicated by the `webpack.config.js` file), it, by default, outputs a `main.js` file to the `dist` directory, which is created if non-existant. 

Install the `@babel/core`, `@babel/polyfill`, and `babel-loader`. The `babel-loader` will let webpack use `@babel-core` and `@babel/polyfill` try to convert any new JS or JSX files, starting with the `entry`-point file, to the bundled vanilla `dist/main.js` file.

```bash
# TODO: In package.json, include a target in the preset environment to avoid the deprecated polyfill under babel.preset = ["@babel/preset-react", ["@babel/preset-env", "target":{"node":10}]
npm install @babel-core @babel/polyfill babel-loader --save-dev
```

## Configure `.bablerc`
Create the Babel config file, `.babelrc`, and include **presets** (or a collection of *plug-ins*) in order for Babel to recognize both the React code with JSX and the plain JS it needs to transpile.

```bash
npm i @babel/preset-react @babel/preset-env --save-dev
```

The `.babelrc` file should include the following:

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

# Frontend: Create React Components
Intall `react` and `react-dom`.

```bash
npm install react react-dom --save-dev
```

In the `entry`-point file, `src/client/index.js`, include the first react component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');

ReactDOM.render(
  <h1>TESTING!</h1>, root)
```

## Run Webpack
Add a script to the `package.json` file that will run webpack and bundle your code into a `dist/main.js` file.

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

> [!Note] Nodemon script was defined [above](#Create-the-Server's-`start`-Script).

```bash
# Bundle code to `dist/main.js`
npm run bundle:dev
# Run server at `src/server/index.js`
npm run start:dev
```

## Create a Basic React Component
Install `react-router-dom`
```bash
npm install react-router-dom --save-dev
```

Create a simple `<App>` component with a `HashRouter` and update the entry-point file, `src/client/index.js`.

```javascript
import React, {Component}  from 'react';
import {HashRouter, Route} from 'react-router-dom';

class App extends Component {
  componentDidMount(){}
  render(){
    return(
      <HashRouter>
        <h1>Hello from APP</h1>
      </HashRouter>
    )
  }
}

export default App
```

While the `src/client/index.js` file is updated to look like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const root = document.getElementById('root');

ReactDOM.render(
  <div>
    <h1>Hello from ReactDOM render (index.js)</h1>
    <App/>
  </div>
  , root)
```

Running the server should render two 'Hello...' lines in the browser.

# Frontend: Create Redux Store and Connect to React

## Create Container Components From Presentational Components
Install `react-redux`

## Define Action/Thunk Creators 
Install `redux` and `redux-thunk`

### Connect Redux Store (State and Dispatchers) To React Props



```bash
npm install redux redux-thunk
```

Define how a *Redux store's* **state** should look in order to replace the stateful components' deeper in the component tree.

Define **reducers** with an initial state set as the optional parameter, because state should never be allowed to be `undefined`. This condition is checked by `combineReducers`.

Define **actions constants** that will update the **store**'s *state*. Define **actions** that will h

Define the **actions** that should be used by the *dispatch* function inside of a **thunks** returned by a **thunk creator**.

> [!Note]
> **Thunks** are called with `dispatch`, `getState`, and whatever extra arguments are passed to `thunkMiddleware.withExtraArgument()` when the *store* was created.
>
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
const thunkedAxiosLogin = () =>
  (dispatch, getState, axios) => // thunk now also receives `axios` dep.
    axios.get('/api/auth/me')
    .then(res => res.data)
    .then(user => {
      dispatch(simpleLogin(user))
    })
```

## Combine Reducers

## Create a Redux Store

### Fetch API Data with Axios Middleware
In order to make HTTP requests to our `/server/routes/api`, install `axios`.

```bash
npm install axios
```

Wrap `axios` calls with store's dispatch