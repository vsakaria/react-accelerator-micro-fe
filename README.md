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

The helper functions called `shallowSnapShot` and `mountSnapShot` that parse snapShots using `toJson` will save you line's code and make the tests less verbose and more readable.  

You may need to install `watchman` to make the test run. 
Refer to https://facebook.github.io/watchman/docs/install.html for install details.

Run `yarn test` to run the suite of test.
Run `yarn update-snap` to update failing snapshot tests.


# Possible build errors

1. If you get a `eslint` error when running `yarn start` the project you should traverse to you local `node_module` and delete the `eslint` package;
