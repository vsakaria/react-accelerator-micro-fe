# Client-summary-application

# Installation.

Do not use `npm` to build this appllication.

`npm` is a non-deterministic package manager, which means your version of `node_modules` may be different from my version of `node_modules`.

`yarn` is a deterministic package manager and always reads the `yarn.lock` file first, resulting in a consistent set of modules across different clones of the project.

Use `yarn`. To do this run `yarn install` in the root directory. 

If you do not have `yarn` install in your CLI then you need to follow the instructions here. 
https://yarnpkg.com/en/docs/getting-started

# Start the application

Run `yarn start`

# Possible build errors

1. If you get a `eslint` error when running `yarn start` the project you should traverse to you local `node_module` and delete the `eslint` package;
