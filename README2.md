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
Install `webpack` (and possibly `webpack-cli`)

```javascript
npm install webpack
```
## Install Babel Modules
In order to code the front-end with newer ES6 syntax, such as deconstructed imports, default exports, polyfilled async-awaits, sugared classes, etc., install [Babel](https://babeljs.io/setup#installation) modules for *Webpack* and *Nodemon*.

These Babel modules will be used by [Wepback](https://webpack.github.io/) to bundle your module's into static `output` code files that *Express server* file serves.

After Webpack finishes the bundling (which will happen periodically, if `webpack` is run with the `-w`tag, in order to watch the files that are linked to the **`entry`-point** indicated by the `webpack.config.js` file),

## Configure `webpack.config.js` and `.babelrc`


## Run Webpack
Nodemon script was defined [above](#Create-the-Server's-`start`-Script).
```json
{
  // ...
  "scripts": {
    // ...
    "start:dev": "nodemon src/server/index.js --ignore dist --ignore src"
  }
  // ...
}
```


# Frontend: Create React Components and Connect Redux State and Dispatcher
Intall `react`, `react-dom`, and `react-router-dom nj`

## Create Container Components From Presentational Components
Install `react-redux`

## Connect Redux Store (State and Dispatchers) To React Props

# Frontend: Create Redux Store

## Define Action/Thunk Creators 
Install `redux` and `redux-thunks`

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