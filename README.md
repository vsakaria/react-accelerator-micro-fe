# Client-summary-application

# Installation.

Do not use `npm` to build this appllication.

`npm` is a non-deterministic package manager, which means your version of `node_modules` may be different from my version of `node_modules`.

`yarn` is a deterministic package manager and always reads the `yarn.lock` file first, resulting in a consistent set of modules across different clones of the project.

Use `yarn`. To do this run `yarn install` in the root directory. 

If you do not have `yarn` installed in your CLI then you need to follow the instructions here. 
https://yarnpkg.com/en/docs/getting-started

# Start the application

Run `yarn start`

# Running Tests

The project uses both Jest Snapshot testing and enzymes DOM query testing. Black box and White box testing respectively. 
You should use Snapshot testing for components that have no moving parts ie. no state and simply render some markup based on props. Enzyme is used for more dynamic components such as one which have click event or state changes. 

If you are writting new test you need to follow the convensation `*.test.tsx` or `*.test.ts`.

The helper functions called `shallowSnapShot` and `mountSnapShot` that parse snapShots using `toJson` will save you line's of code and make the tests less verbose and more readable.  

You may need to install `watchman` to make the test run. 
Refer to https://facebook.github.io/watchman/docs/install.html for install details.

Run `yarn test` to run the suite of test.
Run `yarn update-snap` to update failing snapshot tests.

# Code coverage

You can run the coverage reporter using 

`yarn coverage`

This will open a window in your default browser showing the current test coverage of the project.

# Typescript

The project uses `Typescript` via a `create-react-app` and runs a standard `Typescript` build, you don't have to do anything just run `yarn start`. `Typescript` uses `interfaces` and `types` to enforces return types from functions, the shape of data such as `props` and `state`. All `props` objects should be casting to an `interface` and all `functions` should describe a return type. If the functions doesn't return anything you can use `void`. 

`Typescript` also supports `optional` on a property. You should only use `optional` if it is truly an optional property. Once you use`optional` you must wrap the use of that property in a guard clause, for this reason you should use `optional` only when needed otherwise the code will be bloated with guard clauses everywhere. 

Using `any` is also done in rare cases for example when using 3rd party libraries when the `type` is unknown. Many times developers use `any` on `Event` objects. React type definitions provide a type for events for example `React.MouseEvent` try to use them.  

# Styling

Currently the application uses css modules not SASS to style the components. Css modules offer an advantage over SASS or inline CSS in that you can create a sperate css file for each component. React scripts then gives each component a unique class name for example `ClientSummary_clientSummaryDetails__3KqaM`. This offers an advantage in that there is no opportunity for name clashing which consequently leads to battles with specificity and adding additional classes just to override a style. Furthermore the project use constelliation which provides styles components out the box. Therefore the application doesn't require deeply nested syntax of SASS, nevertheless CSS components offer style sharing via the `composes` syntax.

See: https://github.com/css-modules/css-modules for more info.

# Handling Errors

There are 3 level of error capturing within the application.

1. Component level.
When errors occur within a component, for exmaple `toString` being called on a property which is a `number` the `ErrorBoundary` captures this and displays JSX with an error message. The root `App.tsx` is wrapped in an `ErrorBoundary` component which means all component level errors are captured. However if a child component throws an errors no components are rendered. For this reason you can wrap each component you feel may fail in `ErrorBoundary` however the downside to this is that you will have `ErrorBoundary` scattered thoughtout the code base. For this reason we have wrapped the `ErrorBoundary` in highier order component, this allows us to call the HoC when exporting the component you want to handle errors. Please see `ErrorBoundaryHoC.tsx`.

2. API call level.
TBC

3. Internal Redux action level.
TBC

# Possible build errors

1. If you get a `eslint` error when running `yarn start` the project you should traverse to you local `node_module` and delete the `eslint` package;